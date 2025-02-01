import { Button, Card, Form, Input, message, Typography } from 'antd'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { signUp } from '../api/authApi'
import { SignUpData } from '../types'

const { Title } = Typography

const SignUp = () => {
	const [form] = Form.useForm()

	const mutation = useMutation(
		(userData: SignUpData) => {
			return signUp(userData.fullName, userData.login, userData.password)
		},
		{
			onSuccess: () => {
				message.success('Вы успешно зарегестрированы')
				setTimeout(() => {
					window.location.href = '/sign-in'
				}, 1000)
			},
			onError: error => {
				console.error('Login error:', error)
			},
		}
	)

	const onSubmit = (values: SignUpData) => {
		mutation.mutate({
			login: values.login,
			password: values.password,
			fullName: values.fullName,
		})
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
					Регистрация
				</Title>
				<Form form={form} onFinish={onSubmit} layout='vertical'>
					<Form.Item
						label='Ф.И.О'
						name='fullName'
						rules={[{ required: true, message: 'Введите Ф.И.О' }]}
					>
						<Input placeholder='Введите Ф.И.О' />
					</Form.Item>
					<Form.Item
						name='login'
						rules={[{ required: true, message: 'Введите логин' }]}
						label='Логин'
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
					<Link to={'/sign-in'} className='text-[#1890FF] text-sm font-normal'>
						Вход
					</Link>
					<div className='w-full mt-5 flex justify-center'>
						<Button
							className='bg-[#7CB305] text-sm'
							type='primary'
							htmlType='submit'
						>
							Зарегистрироваться
						</Button>
					</div>
				</Form>
			</Card>
		</div>
	)
}
export default SignUp
