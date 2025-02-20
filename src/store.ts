import FullData from '@/assets/json'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
//@ts-ignore
import { uniqueId } from 'lodash'
const cacheTheme = localStorage.getItem('bm_theme')
export const darkStore = atomWithStorage('bm_dark', localStorage.getItem('bm_dark') ?? 0)
export const themeStore = atomWithStorage('bm_theme', cacheTheme ? JSON.parse(cacheTheme) : 'drillDown')
export const themeOptions = atom<{ label: string; value: string }[]>([
	{ label: '下钻交互', value: 'drillDown' },
	{ label: '平铺交互', value: 'tile' }
])

const traverse = (nodes: any[]) => {
	return nodes.map((node: any) => {
		const newNode = { ...node, id: 'book_item_' + uniqueId() + '_' + new Date().getTime() } // 分配ID并复制节点
		if (newNode.children?.length) {
			// 检查子节点
			newNode.children = traverse(newNode.children) // 递归处理子节点
		}
		return newNode
	})
}

const bookMarkData: BM.Item[] = traverse(FullData)
// console.log(bookMarkData)

export const bookMarkStore = atom<BM.Item[]>(bookMarkData)

export const sizeOption = atom([
	{
		label: '最大',
		value: 1
	},
	{
		label: '大',
		value: 2
	},
	{
		label: '中',
		value: 3
	},
	{
		label: '小',
		value: 4
	}
])
export const sizeMap = new Map([
	[
		1,
		{
			width: 200,
			iconHeight: 50,
			fontSize: 20
		}
	],
	[
		2,
		{
			width: 160,
			iconHeight: 40,
			fontSize: 16
		}
	],
	[
		3,
		{
			width: 120,
			iconHeight: 30,
			fontSize: 12
		}
	],
	[
		4,
		{
			width: 80,
			iconHeight: 20,
			fontSize: 8
		}
	]
])

export const itemShowThemeStore = atomWithStorage(
	'bm_show_theme_size',
	localStorage.getItem('bm_show_theme_size')
		? JSON.parse(localStorage.getItem('bm_show_theme_size') as string)
		: {
				width: 120,
				iconHeight: 30,
				fontSize: 12,
				sizeType: 1,
				showType: 1
			}
)
export const showOption = atom([
	{ label: '正方形', value: 0 },
	{ label: '带圆角', value: 1 },
	{ label: '圆形', value: 2 }
])

export const breadDataStore = atom([bookMarkData])

export const showSearchFlag = atom<boolean>(false)

export const rightClickElement = atom<BM.Item | any>({})

