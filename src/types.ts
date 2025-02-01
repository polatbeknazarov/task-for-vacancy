import React from 'react'

export interface Iroutes {
	path: string
	component: React.FC
}

export interface LoginData {
	login: string
	password: string
}
export interface SignUpData {
	fullName: string
	login: string
	password: string
}

export interface AuthResponse {
	data: string
}

export interface AuthState {
	accessToken: string | null
}

export type Company = {
	id: string
	name: string
	count: number
}

export type AddCompany = {
	name: string
	count: number
}
