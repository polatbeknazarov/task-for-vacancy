import { AuthResponse } from '../types'
import axiosInstance from './axiosInstance'

export const signIn = async (
	login: string,
	password: string
): Promise<AuthResponse> => {
	const response: AuthResponse = await axiosInstance.post('/auths/sign-in', {
		login,
		password,
	})
	return response
}

export const signUp = async (
	fullName: string,
	login: string,
	password: string
): Promise<string> => {
	const response: string = await axiosInstance.post('/auths/sign-up', {
		fullName,
		login,
		password,
	})
	return response
}

export const logout = () => {
	localStorage.removeItem('access_token')
	window.location.href = '/sign-in'
}
