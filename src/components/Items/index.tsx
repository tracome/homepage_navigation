import Folder from '@/assets/img/folder.svg'
import imgLoading from '@/assets/img/img-loading.svg'
import logoImg from '@/assets/logo.svg'
import { itemShowThemeStore } from '@/store'
import { animated, useTransition } from '@react-spring/web'
import { Image } from 'antd'
import { useAtom } from 'jotai'
import React from 'react'
import Style from './index.module.scss'

const Items: React.FC<{ data: BM.Item[]; callback: any }> = props => {
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
	//通用样式
	const className = Style.item + ' bg-white/60 hover:bg-white dark:bg-bgDark-2 dark:border-borderDark dark:text-white dark:hover:bg-black '
	const [showData] = useAtom(itemShowThemeStore)
	const rounded = showData.showType == 0 ? 'rounded-0' : showData.showType == 1 ? 'rounded-6' : 'rounded-full'
	const iconRounded = showData.showType == 0 ? 'rounded-0' : showData.showType == 1 ? 'rounded-3' : 'rounded-full'
	const fontSize = showData.fontSize == 20 ? 'text-20' : showData.fontSize == 16 ? 'text-16' : showData.fontSize == 12 ? 'text-12' : 'text-8'
	return (
		<>
			{transition((style, item) => {
				if (item.type === 1) {
					return (
						<animated.a className={className + rounded} style={style} target='_blank' href={item.link} title={item.desc || item.label}>
							<Image height={showData.iconHeight} width={showData.iconHeight} className={'object-scale-down object-center ' + iconRounded} src={item.icon} preview={false} fallback={logoImg} placeholder={<Image preview={false} src={imgLoading} height={showData.iconHeight} width={showData.iconHeight} className={'object-center ' + iconRounded} />} />
							<h6 className={`mt-15 font-normal `+fontSize}>{item.label}</h6>
						</animated.a>
					)
				} else {
					return (
						<animated.div className={className + rounded} style={style} onClick={() => props.callback(item)}>
							<img src={Folder} alt='' className={'w-1/4 ' + iconRounded} />
							<h6 className={`mt-15 font-normal `+fontSize}>{item.label}</h6>
						</animated.div>
					)
				}
			})}
		</>
	)
}
export default Items
