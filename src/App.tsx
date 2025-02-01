import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './utils/PrivateRoute'

function App() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path='/' element={<Main />} />
				</Route>
			</Routes>
		</QueryClientProvider>
	)
}

export default App
