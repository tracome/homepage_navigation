import Folder from '@/assets/img/folder.svg'
import imgLoading from '@/assets/img/img-loading.svg'
import logoImg from '@/assets/logo.svg'
import { bookMarkStore, itemShowThemeStore } from '@/store'
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations'
import { Empty, Modal, Toast } from '@douyinfe/semi-ui'
import { animated, useTransition } from '@react-spring/web'
import { Image } from 'antd'
import { useAtom } from 'jotai'
import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import Style from './index.module.scss'

const Items: React.FC<{ data: BM.Item[]; callback: any }> = props => {
	// console.log('props', props.data.length)
	//动画
	const transition = useTransition(props.data, {
		trail: 400 / props.data.length,
		from: { opacity: 0, transform: 'scale3d(0,0,0)' },
		enter: { opacity: 1, transform: 'scale3d(1,1,1)' },
		config: {
			tension: 500,
			friction: 50
		}
	})

	//通用样式bg-white/60
	const className = Style.item + ' bookMarkItem bg-white/60 hover:bg-white dark:bg-bgDark-2 dark:border-borderDark dark:text-white dark:hover:bg-black '
	const [showData] = useAtom(itemShowThemeStore)
	const rounded = showData.showType == 0 ? 'rounded-0' : showData.showType == 1 ? 'rounded-6' : 'rounded-[50%]'
	const iconRounded = showData.showType == 0 ? 'rounded-0' : showData.showType == 1 ? 'rounded-3' : 'rounded-[50%]'
	const fontSize = showData.fontSize == 20 ? 'text-20' : showData.fontSize == 16 ? 'text-16' : showData.fontSize == 12 ? 'text-12' : 'text-8'
	const [currentData, setCurrentData] = useAtom(bookMarkStore)
	const SortableItem = SortableElement(({ item, style }: { item: any; style: any }) => {
		// console.log(item, style)
		if (item.type === 1) {
			return (
				<animated.a className={className + rounded + ' ' + item.id} style={style} target='_blank' href={item.link} title={item.desc || item.label}>
					<Image height={showData.iconHeight} width={showData.iconHeight} className={'object-scale-down object-center ' + iconRounded} src={item.icon} preview={false} fallback={logoImg} placeholder={<Image preview={false} src={imgLoading} height={showData.iconHeight} width={showData.iconHeight} className={'object-center ' + iconRounded} />} />
					<h6 className={`mt-15 font-normal ` + fontSize}>{item.label}</h6>
				</animated.a>
			)
		} else {
			return (
				<animated.div className={className + rounded + ' ' + item.id} style={style} onClick={() => props.callback(item)}>
					<img src={Folder} alt='' className={'w-1/4 ' + iconRounded} />
					<h6 className={`mt-15 font-normal ` + fontSize}>{item.label}</h6>
				</animated.div>
			)
		}
	})
	// const SortableItem = SortableElement(({ item }) => <div className='w-1/4'>{item}</div>)

	const SortableList = SortableContainer(({ items }: any) => {
		// console.log(items)
		let index = 0
		return (
			<div
				className='grid-rows-auto beautyScroll grid flex-1 gap-20 p-20'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(' + showData.width + 'px, 1fr))',
					gridAutoRows: showData.width + 'px'
				}}
			>
				{props.data.length ? (
					transition((style, item): any => {
						//@ts-ignore
						return <SortableItem key={item.id} index={index++} item={item} style={style}></SortableItem>
					})
				) : (
					<Empty className='col-[1/-1]' image={<IllustrationConstruction style={{ width: '100%', height: '100%' }} />} darkModeImage={<IllustrationConstructionDark style={{ width: '100%', height: '100%' }} />} title={'无链接'} description='请右键鼠标添加导航。' />
				)}
			</div>
		)
	}) as any
	const onDragEnd = ({ oldIndex, newIndex }: any) => {
		// console.log(oldIndex, newIndex)

		if (oldIndex == newIndex) return
		setCurrentData(currentData => {
			let maxIndex = Math.max(oldIndex, newIndex)
			let minIndex = Math.min(oldIndex, newIndex)
			if (currentData[maxIndex].type !== currentData[minIndex].type) {
				Toast.warning({
					content: '不能移动变换链接和文件夹!',
					duration: 3,
				})
			} else {
				Toast.destroyAll()
				let temp = currentData[maxIndex]
				currentData.splice(maxIndex, 1)
				currentData.splice(minIndex, 0, temp)
				// console.log(currentData)
			}
			return [...currentData]
		})
	}
	return (
		<>
			<SortableList items={props.data} distance={5} axis={'xy'} lockToContainerEdges={true} onSortEnd={onDragEnd} />
		</>
	)
}
export default Items
