import Logo from '@/components/Logo'
import { itemShowThemeStore, showOption, sizeMap, sizeOption, themeOptions, themeStore } from '@/store'
import { Select } from '@douyinfe/semi-ui'
import { useAtom, useAtomValue } from 'jotai'
import { useState } from 'react'
import BaiduSearch from './BaiduSearch'
import DarkBtn from './DarkBtn'

function Header() {
	const themeOptionsAtom = useAtomValue(themeOptions)
	const sizeOptionAtom = useAtomValue(sizeOption)
	const showOptionAtom = useAtomValue(showOption)
	const [itemShowTheme, setItemShowTheme] = useAtom<BM.ItemShowTheme>(itemShowThemeStore)
	const [currentTheme, setCurrentTheme] = useAtom(themeStore)

	const [sizeData, setSizeData] = useState(itemShowTheme.sizeType)
	const [showData, setShowData] = useState(itemShowTheme.showType)

	const changeItemTheme = (val: number, type: string) => {
		if (type === 'size') {
			setSizeData(val)
			setItemShowTheme({
				...itemShowTheme,
				sizeType: val,
				width: sizeMap.get(val)?.width as number,
				iconHeight: sizeMap.get(val)?.iconHeight as number,
				fontSize: sizeMap.get(val)?.fontSize as number
			})
		}
		if (type === 'show') {
			setShowData(val)
			setItemShowTheme({
				...itemShowTheme,
				showType: val
			})
		}
	}
	return (
		<header className='flex h-80 items-center justify-between border-b border-b-transparent px-20 dark:border-b-borderDark dark:bg-bgDark-2' style={{ borderBottomStyle: 'solid' }}>
			<div className='flex items-center'>
				<div className='mr-10'>
					<Logo />
				</div>
				<BaiduSearch />
			</div>
			<div className='flex items-center space-x-10'>
				{/* <Tooltip content='觉得不错？点个赞支持一下！' position='left'>
					<Button icon={<ThumbsUp theme='outline' />} onClick={() => window.open('https://gitee.com/robin901118/homepage_navigation', '_blank')} type='tertiary' size='large' />
				</Tooltip> */}

				<Select value={sizeData} insetLabel='大小' size='default' optionList={sizeOptionAtom} onChange={e => changeItemTheme(e as number, 'size')} />
				<Select value={showData} insetLabel='形状' size='default' optionList={showOptionAtom} onChange={e => changeItemTheme(e as number, 'show')} />
				<Select value={currentTheme} size='default' optionList={themeOptionsAtom} onChange={e => setCurrentTheme(e as string)} />
				<DarkBtn />
			</div>
		</header>
	)
}

export default Header
