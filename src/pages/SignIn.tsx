import { Button, Card, Form, Input, Typography } from 'antd'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { signIn } from '../api/authApi'
import { LoginData } from '../types'

const { Title } = Typography

export default function SignIn() {
	const [form] = Form.useForm()

	if (localStorage.getItem('access_token')) {
		window.location.href = '/'
	}

	const mutation = useMutation(
		(userData: LoginData) => {
			return signIn(userData.login, userData.password)
		},
		{
			onSuccess: data => {
				localStorage.setItem('access_token', data.data)
				window.location.href = '/'
			},
			onError: error => {
				console.error('Login error:', error)
			},
		}
	)

	const onSubmit = (values: { login: string; password: string }) => {
		mutation.mutate({ login: values.login, password: values.password })
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
			className='bg-[url("bg-image.jpg")] relative bg-no-repeat bg-cover w-full h-screen bg-bottom'
		>
			<div className='absolute inset-0 bg-black/70'></div>
			<Card className='w-[30%] !shadow-none flex flex-col' bordered={false}>
				<Title level={1} style={{ textAlign: 'left' }}>
					Вход
				</Title>
				<Form form={form} onFinish={onSubmit} layout='vertical'>
					<Form.Item
						label='Логин'
						name='login'
						rules={[{ required: true, message: 'Введите логин' }]}
					>
						<Input placeholder='Введите логин' />
					</Form.Item>
					<Form.Item
						label='Пароль'
						name='password'
						rules={[{ required: true, message: 'Введите пароль' }]}
					>
						<Input.Password placeholder='Введите пароль' />
					</Form.Item>
					<Link to={'/sign-up'} className='text-[#1890FF] text-sm font-normal'>
						Регистрация
					</Link>
					<div className='w-full mt-5 flex justify-center'>
						<Button
							className='bg-[#7CB305] text-sm'
							type='primary'
							htmlType='submit'
							loading={mutation.isLoading}
						>
							Вход
						</Button>
					</div>
					{mutation.isError && (
						<p className='text-red-500 text-center mt-2'>Ошибка входа</p>
					)}
				</Form>
			</Card>
		</div>
	)
}
