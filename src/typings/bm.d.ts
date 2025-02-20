declare namespace BM {
	interface Item {
		//唯一id
		id?: string
		//类型，1->链接 2->文件夹
		type: 1 | 2
		//名称（链接标题或者文件夹名）
		label: string
		//链接（仅链接有）
		link?: string
		//图标（仅链接有）
		icon?: string
		//描述
		desc?: string
		//子集（仅文件夹有）
		children?: Array<BM.Item>
		//其他若干不限制属性
		[propName: string]: any
	}
	interface ItemShowTheme {
		//宽度
		width: number
		//图标高度
		iconHeight: number
		//标签字大小
		fontSize: number
		//大小类型
		sizeType: number
		//显示类型
		showType: number
	}
}
