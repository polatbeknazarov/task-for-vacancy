import Main from '../pages/Main'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { Iroutes } from '../types'

export const routes: Iroutes[] = [
	{
		path: '/',
		component: Main,
	},
	{
		path: '/sign-up',
		component: SignUp,
	},
	{
		path: '/sign-in',
		component: SignIn,
	},
]
