import FullData from '@/assets/json'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
const cacheTheme = localStorage.getItem('bm_theme')
export const darkStore = atomWithStorage('bm_dark', localStorage.getItem('bm_dark') ?? 0)
export const themeStore = atomWithStorage('bm_theme', cacheTheme ? JSON.parse(cacheTheme) : 'drillDown')
export const themeOptions = atom<{ label: string; value: string }[]>([
	{ label: '下钻交互', value: 'drillDown' },
	{ label: '平铺交互', value: 'tile' }
])

export const bookMarkStore = atom<BM.Item[]>(FullData)

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

export const breadDataStore = atom<BM.Item[]>([])
