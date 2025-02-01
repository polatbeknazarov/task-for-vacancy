import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const token = localStorage.getItem('access_token')
	return token ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
