import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import type { MenuProps, PopconfirmProps } from 'antd'
import { Dropdown, message, Popconfirm, Space, Table } from 'antd'

import type { ColumnsType } from 'antd/es/table'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getAllCompany, useDeleteCompany } from '../api/companyApi'
import { Company } from '../types'
import ManageCompanyModal from './ManageCompanyModal'

const cancel: PopconfirmProps['onCancel'] = e => {
	console.log(e)
	message.error('Click on No')
}

function CompanyListTable() {
	const { data, isLoading, isError, error } = useQuery(
		['company'],
		getAllCompany
	)
	const { mutate: deleteCompany } = useDeleteCompany()
	const [open, setOpen] = useState(false)
	const [selectedCompany, setSelectedCompany] = useState()
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	})

	if (isError) {
		const axiosError = error as AxiosError
		console.log(axiosError.response?.status)
	}

	const handleDelete = (id: string) => {
		deleteCompany(id)
	}

	const handlePageChange = (page: number, pageSize: number) => {
		setPagination(prev => ({
			...prev,
			current: page,
			pageSize,
		}))
	}

	const columns: ColumnsType<Company> = [
		{
			title: 'Название компании',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Количество сотрудников',
			dataIndex: 'count',
			key: 'employeesCount',
			render: record => <p>{record} сотрудников</p>,
		},
		{
			title: 'Действия',
			key: 'actions',
			render: record => {
				const items: MenuProps['items'] = [
					{
						label: (
							<button
								onClick={() => {
									setSelectedCompany(record)
									setOpen(true)
								}}
								className='flex items-center gap-2'
							>
								<EditOutlined />
								Изменить
							</button>
						),
						key: '0',
					},
					{
						label: (
							<Popconfirm
								title='Вы действительно хотите удалить?'
								onConfirm={() => handleDelete(record.id)}
								onCancel={cancel}
								okText='Да'
								cancelText='Отменить'
							>
								<button className='flex items-center gap-2 text-red-500'>
									<DeleteOutlined />
									Удалить
								</button>
							</Popconfirm>
						),
						key: '1',
					},
				]

				return (
					<div className='flex items-center justify-center'>
						<Dropdown
							className='w-[28px] h-[28px] flex items-center justify-center text-[18px] hover:bg-gray-100 rounded-full'
							menu={{ items }}
							trigger={['click']}
						>
							<Space>
								<MoreOutlined />
							</Space>
						</Dropdown>
					</div>
				)
			},
			width: 140,
			align: 'center',
		},
	]

	return (
		<>
			<Table
				columns={columns}
				dataSource={data?.data}
				loading={isLoading}
				rowKey='id'
				bordered
				expandable={{
					rowExpandable: () => false,
					expandIcon: () => null,
				}}
				style={{ cursor: 'pointer' }}
				pagination={
					data && data.data.length > pagination.pageSize
						? {
								current: pagination.current,
								pageSize: pagination.pageSize,
								onChange: handlePageChange,
						  }
						: false
				}
			/>
			<ManageCompanyModal
				openModal={open}
				setOpenModal={setOpen}
				isEdit={true}
				selectedCompany={
					selectedCompany
						? selectedCompany
						: {
								id: '',
								name: '',
								count: 0,
						  }
				}
			/>
		</>
	)
}

export default CompanyListTable
