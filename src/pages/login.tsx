import Layout from '@/ui/layout/Layout'
import LoginForm from '@/ui/AuthForm/login-form/LoginForm'

const Login = () => {
	return (
		<Layout
			meta={{
				title: 'Sound Cloud Authentication'
			}}
			content={{
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<LoginForm />
		</Layout>
	)
}

export default Login
