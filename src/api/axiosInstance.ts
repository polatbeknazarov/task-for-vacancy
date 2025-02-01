import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://45.138.158.137:92/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('access_token')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default axiosInstance
