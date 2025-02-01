import { Button, Form, Input, message, Modal } from 'antd'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addCompany, updateCompany } from '../api/companyApi'
import { AddCompany, Company } from '../types'

type Props = {
	openModal: boolean | undefined
	setOpenModal: Function
	isEdit: boolean
	selectedCompany: {
		id: string
		name: string
		count: number
	}
}

const layout = {
	labelCol: {
		span: 8,
		className: '!text-left',
	},
	wrapperCol: {
		span: 16,
	},
}

export default function ManageCompanyModal({
	openModal,
	setOpenModal,
	isEdit,
	selectedCompany,
}: Props) {
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
	const createCompanyMutation = useMutation(
		(data: AddCompany) => {
			return addCompany(data.name, data.count)
		},
		{
			onSuccess: () => {
				message.success('Компания успешна создана')
				queryClient.invalidateQueries({ queryKey: ['company'] })
				form.resetFields()
				setOpenModal(false)
			},
			onError: () => {
				message.error('Произошла ошибка. Попробуйте еще раз')
			},
		}
	)

	useEffect(() => {
		if (isEdit && selectedCompany) {
			form.setFieldsValue({
				name: selectedCompany?.name,
				count: selectedCompany?.count,
			})
		}
	}, [isEdit, selectedCompany, form])

	const updateCompanyMutation = useMutation(
		(data: Company) => {
			return updateCompany(data.id, data.name, data.count)
		},
		{
			onSuccess: () => {
				message.success('Компания успешна отредактирована')
				queryClient.invalidateQueries({ queryKey: ['company'] })
				form.resetFields()
				setOpenModal(false)
			},
			onError: () => {
				message.error('Произошла ошибка. Попробуйте еще раз')
			},
		}
	)

	function handleUpdateCompany(values: Company) {
		updateCompanyMutation.mutate({
			id: selectedCompany.id,
			name: values.name,
			count: values.count,
		})
		setOpenModal(false)
	}

	function handleCreateCompany(values: AddCompany) {
		createCompanyMutation.mutate({ name: values.name, count: values.count })
		setOpenModal(false)
	}

	return (
		<Modal
			open={openModal}
			onCancel={() => {
				form.resetFields()
				setOpenModal(false)
			}}
			cancelButtonProps={{ hidden: true }}
			okButtonProps={{ hidden: true }}
			title={isEdit ? 'Редактировать компанию' : 'Добавить компанию'}
			width={600}
		>
			<Form
				form={form}
				onFinish={isEdit ? handleUpdateCompany : handleCreateCompany}
				className='w-full mt-10'
				{...layout}
			>
				<Form.Item name={'name'} required label='Название компании'>
					<Input placeholder='Введите название' />
				</Form.Item>
				<Form.Item name={'count'} required label='Количество сотрудников'>
					<Input type='number' placeholder='Введите количество' />
				</Form.Item>
				<div className='w-full mt-5 flex justify-center'>
					<Button
						loading={createCompanyMutation.isLoading}
						className='bg-[#7CB305] hover:!bg-[#598005] text-sm'
						type='primary'
						htmlType='submit'
					>
						{isEdit ? 'Изменить компанию' : 'Добавить компанию'}
					</Button>
				</div>
			</Form>
		</Modal>
	)
}
