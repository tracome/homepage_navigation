import { bookMarkStore } from '@/store'
import { IconSearch } from '@douyinfe/semi-icons'
import { Input } from '@douyinfe/semi-ui'
import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'

const MarkSearch: React.FC<any> = ({ hideSearch }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [currentData, setCurrentData] = useAtom(bookMarkStore)

	const [preData] = useState(currentData)
	useEffect(()=>{
		inputRef.current?.focus()
	},[])
	const search = (val: string) => {
		// console.log(inputRef)
		if (val.length > 0) {
			setCurrentData(
				preData.filter(item => {
					return item.label.includes(val) || item.desc?.includes(val)
				})
			)
		} else {
			setCurrentData(preData)
		}
	}

	// const inputEnter = function (e: React.KeyboardEvent<HTMLInputElement>) {
	// 	const val: string = inputRef.current?.value || ''
	// 	e.key === 'Enter' && search(val)
	// }
	// onClear={() => search()} onEnterPress={()=>search()}
	return <Input prefix={<IconSearch />} placeholder='搜索书签' size='large' className='fixed left-1/4 right-1/4 top-50 w-1/2 rounded-5' ref={inputRef} showClear onChange={v => search(v)} onBlur={() => hideSearch()} />
}

export default MarkSearch
