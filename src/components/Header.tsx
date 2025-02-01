import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import { logout } from '../api/authApi'
import ManageCompanyModal from './ManageCompanyModal'

export default function Header() {
	const [openModal, setOpenModal] = useState(false)

	return (
		<div className='bg-[#313131] px-[15px] h-[65px] flex items-center justify-between'>
			<h1 className='text-white font-bold'>Компаний</h1>
			<div className='flex gap-[20px]'>
				<LogoutOutlined
					onClick={logout}
					className='text-[25px] text-white rotate-180 cursor-pointer'
				/>
				<Button
					onClick={() => setOpenModal(true)}
					className='bg-[#08979C] border-none hover:!bg-[#077478] hover:!text-black'
				>
					Добавить компанию
				</Button>
			</div>
			<ManageCompanyModal
				isEdit={false}
				openModal={openModal}
				setOpenModal={setOpenModal}
				selectedCompany={{
					id: '',
					name: '',
					count: 0,
				}}
			/>
		</div>
	)
}
