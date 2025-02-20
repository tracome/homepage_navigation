import { bookMarkStore, rightClickElement } from '@/store'
import { Form, Modal, Toast } from '@douyinfe/semi-ui'
import { useAtom } from 'jotai'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
//@ts-ignore
import { uniqueId } from 'lodash'
const BookMark: React.FC<any> = ({ visible, setVisible, menuId }: any) => {
	const { Option } = Form.Select

	const [formApi, setFormApi] = useState<any>({})
	const [currentData, setCurrentData] = useAtom(bookMarkStore)
	const [formInitValue, setFormInitValue] = useState<any>({
		linkType: 1
	})
	const [rightClickEle, setRightClickEle] = useAtom(rightClickElement)
	const cbRef = useRef<BM.Item[]>(currentData)
	useEffect(() => {
		// console.log('breadData',breadData)
		cbRef.current = currentData
	}, [currentData])
	useLayoutEffect(() => {
		let initValue = rightClickEle
		// console.log('right')
		if (initValue.id && menuId === 3) {
			setFormInitValue({
				id: initValue.id,
				name: initValue.label,
				linkType: Number(initValue.type),
				link: initValue.link,
				icon: initValue.icon,
				desc: initValue.desc
			})
			// console.log('test', rightClickEle, menuId)
		} else {
			setFormInitValue({
				linkType: 1
			})
		}
	}, [rightClickEle, menuId])
	const handleOk = () => {
		let formState = formApi.getFormState().values
		if (formState.name == '' || cbRef.current.findIndex(i => i.label === formState.name) > -1) {
			Toast.warning({
				content: '名称已经有了或未填写名称，请修改！'
			})
		} else {
			setCurrentData(currentData => {
				// console.log(currentData, formState)
				if (formState.id) {
					return [
						...currentData.map(i => {
							if (i.id === formState.id) {
								i.type = Number(formState.linkType) as any
								i.label = formState.name
								i.link = formState.link
								i.icon = formState.icon
								i.desc = formState.desc
								if (formState.linkType === 2) {
									i.children = i.children ? i.children : []
								}
								// console.log(i, 'modify')
								setRightClickEle({
									...rightClickEle,
									...i
								})
							}
							return i
						})
					] as any
				} else {
					let addItem = {
						id: 'book_item_' + uniqueId() + '_' + new Date().getTime(),
						type: Number(formState.linkType) as any,
						label: formState.name,
						link: formState.link,
						icon: formState.icon,
						desc: formState.desc
					}
					if (Number(formState.linkType) === 2) {
						//@ts-ignore
						addItem.children = []
					}
					return [...currentData, addItem]
				}
			})
			setVisible(false)
		}
	}
	const handleCancel = () => {
		setVisible(false)
		// console.log('Cancel button clicked')
	}
	const getFormApi = (formApi: any) => {
		setFormApi(formApi)
	}
	return (
		<>
			<Modal
				title='添加导航'
				visible={visible}
				onOk={handleOk}
				// afterClose={handleAfterClose} //>=1.16.0
				onCancel={handleCancel}
				closeOnEsc={true}
			>
				<Form getFormApi={getFormApi} initValues={formInitValue} labelPosition={'left'} labelWidth={'80px'} labelAlign={'right'}>
					{({ formState }: any) => (
						<>
							<Form.Select field='linkType' disabled={!!formState.id} label={{ text: '导航类型' }} style={{ width: 120 }}>
								<Option value={1}>链接</Option>
								<Option value={2}>文件夹</Option>
							</Form.Select>
							<Form.Input field='name' label='名称' />
							{formState.values.linkType === 1 ? (
								<>
									<Form.Input field='link' label='导航地址' />
									<Form.Input field='icon' label='图标地址' />
								</>
							) : null}
							<Form.TextArea field='desc' label='描述' />
						</>
					)}
				</Form>
			</Modal>
		</>
	)
}

export default BookMark
