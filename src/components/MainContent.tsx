import { bookMarkStore, breadDataStore, itemShowThemeStore, rightClickElement, showSearchFlag } from '@/store'
import { useAtom } from 'jotai'
import 'swiper/css'

import { IconArrowUp, IconDelete, IconEdit, IconExport, IconImport, IconPlus, IconSearch } from '@douyinfe/semi-icons'
import { BackTop, Modal } from '@douyinfe/semi-ui'
import type { MenuProps } from 'antd'
import { Dropdown, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import BookMark from './BookMark'
//@ts-ignore
import iojson from 'iojson'
//@ts-ignore differenceBy, intersectionWith
import { uniqBy } from 'lodash'
import Items from './Items'
function MainContent({ callback = null }: { callback: any }): any {
	const items: MenuProps['items'] = [
		{
			label: '添加导航',
			key: '1',
			icon: <IconPlus />
		},
		{
			label: '本地搜索CRTL+F',
			key: '2',
			icon: <IconSearch />
		}
	]
	const markItems: MenuProps['items'] = [
		{
			label: '修改导航',
			key: '3',
			icon: <IconEdit />
		},
		{
			label: '删除导航',
			key: '4',
			icon: <IconDelete />
		}
	]

	const [currentData, setCurrentData] = useAtom(bookMarkStore)
	const [breadData, setBreadData] = useAtom(breadDataStore)
	const [showData] = useAtom(itemShowThemeStore)
	const [showSearch, setShowSearch] = useAtom(showSearchFlag)
	const [rightClickEle, setRightClickEle] = useAtom(rightClickElement)
	// const [darkState, setDarkState] = useAtom(darkStore)
	const rightClickEleRef = useRef<BM.Item>(rightClickEle)
	const cbRef = useRef<BM.Item[]>(currentData)
	const breadRef = useRef(breadData)

	useEffect(() => {
		// console.log('breadData',breadData)
		breadRef.current = breadData
	}, [breadData])

	const [visible, setVisible] = useState(false)
	const [menuId, setMenuId] = useState(1)
	useEffect(() => {
		// console.log(rightClickEle.type, rightClickEle.type !== 3)
		if (rightClickEle.type !== 3) {
			setMenuProps({
				...menuProps,
				items: [...items, ...markItems]
			})
		} else {
			setMenuProps({
				...menuProps,
				items: [...items]
			})
		}
		rightClickEleRef.current = rightClickEle
	}, [rightClickEle])

	useEffect(() => {
		if (cbRef.current && menuId !== 2) {
			//@ts-ignore
			cbRef.current = currentData
			// console.log(currentData)
			setBreadData((breadData: any[]) => {
				// console.log('breadData')
				let current = breadData.at(-1)
				if (breadData.length > 1) {
					current.children = [...cbRef.current]
					// console.log(breadData.toReversed())
					breadData = breadData
						.toReversed()
						.map((i: any, idx: number) => {
							let childrenFlag = !!i?.children?.length
							// console.log(childrenFlag, current, i, idx)
							if (idx > 0) {
								childrenFlag
									? i.children.map((item: { id: any }) => {
											if (item.id === breadData[idx - 1].id) {
												return breadData[idx - 1]
											}
											return item
										})
									: i.map((item: { id: any }) => {
											if (item.id === breadData[idx - 1].id) {
												return breadData[idx - 1]
											}
											return item
										})
							}
							return i
						})
						.toReversed()
				} else {
					breadData = [[...currentData]]
				}
				// console.log(breadData)
				return breadData
			})
		}
	}, [currentData, menuId])
	const selectMenu = ({ item, key, keyPath, domEvent }: any) => {
		// console.log(item, key, keyPath, domEvent)
		// console.log(key == '4')
		switch (key) {
			//增加
			case '1':
				setMenuId(1)
				setVisible(true)
				break
			//查询
			case '2':
				setMenuId(2)
				setShowSearch(true)
				break
			//修改
			case '3':
				setMenuId(3)
				setVisible(true)
				break
			//删除
			case '4':
				setMenuId(4)
				Modal.warning({
					title: '删除导航',
					content: '确定要删除吗？',
					onOk: () => {
						// console.log(cbRef.current)
						setCurrentData(cbRef.current.filter(i => i.id !== rightClickEleRef.current.id))
					}
				})
				break
		}
	}
	const [menuProps, setMenuProps] = useState<MenuProps>({ items: [...items, ...markItems], onClick: selectMenu, theme: 'dark' })
	// const className ='hover:bg-white dark:bg-bgDark-2 dark:border-borderDark dark:text-white dark:hover:bg-black'
	// overlayClassName={className}darkState==0?'dark':'light'
	const style = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 25,
		width: 25,
		borderRadius: '100%',
		backgroundColor: '#0077fa',
		color: '#fff',
		bottom: 80,
		right: 30
	}
	const comparator = (arrVal: { children: string | any[]; label: any }, othVal: { children: string | any[]; label: any }) => {
		if (arrVal?.children?.length && othVal?.children?.length) {
			if (arrVal.label === othVal.label) {
				return true
			}
		}
		return false
	}
	const pinyinSort = (a: string, b: string) => {
		new Intl.Collator('zh-Hans-CN', { sensitivity: 'accent' }).compare(a, b)
	}
	const importNavigation = (oldArr: any, newArr: any, storeArr: any) => {
		// const labelDifferenceArr = differenceBy(newArr, oldArr, 'label')
		// const labelSameArr = intersectionWith(newArr, oldArr, comparator).sort(pinyinSort)

		// const oldLabelDiffArr = differenceBy(oldArr, labelSameArr, 'label')
		// const oldSameDiffArr = differenceBy(oldArr, labelSameArr, comparator).sort(pinyinSort)
		// storeArr = [...oldLabelDiffArr, ...labelDifferenceArr]
		// if (Array.isArray(labelSameArr) && Array.isArray(oldSameDiffArr)) {
		// 	// labelSameArr.forEach(i=>{
		// 	// 	if()
		// 	// })
		// }
		//链接处理
		
		//文件夹处理

		return storeArr
	}
	const uniqueLabel = (arr: Array<any>) => {
		arr = uniqBy(arr, 'label')
		arr = arr.map(i => {
			if (i?.children?.length) {
				i.children = uniqueLabel(i.children)
			}
			return i
		})
		return arr
	}
	//导出json
	const outJson = () => {
		// console.log('breadRef',breadRef)
		iojson.exportJSON(breadRef.current[0], `导航-${new Date().getTime()}`)
	}
	const inputJson = () => {
		iojson.importJSON().then((res: any) => {
			// breadRef.current[0].fo
			// console.log(uniqueLabel(res))
			let fullData = uniqueLabel(res)
			setBreadData([fullData])
			setCurrentData(fullData)
		})
	}
	return (
		<>
			<Dropdown menu={menuProps} trigger={['contextMenu']}>
				<main className='flex flex-1 flex-col overflow-y-auto' id='mainContent'>
					<Items data={currentData} callback={callback} />
					<BackTop style={style} target={() => document.getElementById('mainContent')}>
						<IconArrowUp />
					</BackTop>
					<div className='fixed bottom-[120px] right-30 flex flex-col items-center justify-center'>
						<Tag onClick={outJson} icon={<IconExport />} className='mb-6 grid size-25 cursor-pointer place-items-center rounded-[50%] p-0'></Tag>
						<Tag icon={<IconImport />} className='grid size-25 cursor-pointer place-items-center rounded-[50%] p-0' onClick={inputJson}></Tag>
					</div>
				</main>
			</Dropdown>
			<BookMark visible={visible} setVisible={setVisible} menuId={menuId} />
		</>
	)
}
export default MainContent
