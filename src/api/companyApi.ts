import { message } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import axiosInstance from './axiosInstance'

export const getAllCompany = async () => {
	const res: any = await axiosInstance.get('/companies/get-all')

	return { data: res.data, headers: res.headers }
}

export const addCompany = async (name: string, count: number) => {
	const res = await axiosInstance.post('/companies/add', {
		name,
		count,
	})

	return res
}

export const deleteCompany = async (companyId: string) => {
	const res = await axiosInstance.delete('/companies/delete/by-id', {
		data: companyId,
	})
	return res
}

export const useDeleteCompany = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteCompany,
		onSuccess: () => {
			message.success('Компания удалена успешно')
			queryClient.invalidateQueries({ queryKey: ['company'] })
		},
		onError: error => {
			console.error('Ошибка удаления:', error)
		},
	})
}

export const updateCompany = async (
	id: string,
	name: string,
	count: number
) => {
	const res = await axiosInstance.put('/companies/update', {
		id,
		name,
		count,
	})

	return res
}
