import { Breadcrumb } from '@douyinfe/semi-ui'
import { Home, LeftOne } from '@icon-park/react'
//@ts-ignore
import MainContent from '@/components/MainContent'
import { bookMarkStore, breadDataStore } from '@/store'
import { useAtom } from 'jotai'
import packageJson from '../../../package.json'
// import { Dropdown } from 'antd'
function DrillDown() {
	//当前页面的书签

	const [currentData, setCurrentData] = useAtom(bookMarkStore)
	//面包屑数据
	const [breadData, setBreadData] = useAtom(breadDataStore)

	//新增面包屑
	const addBreadData = (item: any) => {
		if (item.children) {
			setBreadData(old => [...old, item])
			setCurrentData(item.children)
		}
	}
	//删除面包屑（点击返回的时候调用）
	const removeBreadData = () => {
		setBreadData(oldState => {
			if (oldState.length) {
				const readyState = oldState.slice(0, -1)
				if (readyState.length <= 1) {
					setCurrentData(readyState[0])
				} else {
					//@ts-ignore
					setCurrentData(readyState?.at(-1).children || readyState[0])
				}
				return readyState
			} else {
				return oldState
			}
		})
	}
	//点击面包屑item
	const breadItemClickHandle = (index?: number) => {
		console.log(index)
		if (index == undefined) {
			const readyState = breadData.slice(0, 1)
			setCurrentData(breadData[0])
			setBreadData(readyState)
		} else {
			const readyState = breadData.slice(0, index + 2)
			setBreadData(readyState)
			//@ts-ignore
			setCurrentData(readyState?.at(-1)?.children)
		}
	}

	return (
		<>
			{breadData.length > 1 && (
				<div className='center group fixed left-10 top-2/4 z-10 h-40 w-40 -translate-y-2/4 cursor-pointer rounded-full border border-solid border-transparent bg-slate-300 text-20 text-white hover:w-auto hover:bg-slate-400 dark:border-borderDark dark:bg-bgDark-2' onClick={removeBreadData}>
					<LeftOne theme='filled' />
					<span className='hidden overflow-hidden truncate pr-10 group-hover:block'>返回</span>
				</div>
			)}
			<MainContent callback={addBreadData}></MainContent>
			<div className='flex h-30 items-center justify-between border-t border-t-transparent bg-white px-10 dark:border-t-borderDark dark:bg-bgDark-2' style={{ borderTopStyle: 'solid' }}>
				<Breadcrumb compact={false}>
					<Breadcrumb.Item
						onClick={() => breadItemClickHandle()}
						icon={
							<span>
								<Home theme='outline' />
							</span>
						}
					/>
					{breadData.slice(1).map((item: any, index) => (
						<Breadcrumb.Item key={item.label} onClick={() => breadItemClickHandle(index)}>
							{item.label}
						</Breadcrumb.Item>
					))}
				</Breadcrumb>
				<span className='text-12 text-slate-600 dark:text-white'>当前版本：{packageJson.version}</span>
			</div>
		</>
	)
}

export default DrillDown
