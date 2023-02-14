import { useEffect } from 'react'
import { LoginForm, RegisterForm } from '@/components/ui'
import { useAuth } from '@/hooks/auth-hooks/useAuth'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import Meta from '@/components/meta/Meta'

const AuthScreen = () => {
	const { user, authType } = useAuth()
	const { push } = useRouter()

	useEffect(() => {
		if (user) {
			push('/').then(r => r)
		}
	}, [user])

	return (
		<>
			<Meta title={'Sound Cloud Auth'} />
			<Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
				{authType === 'login' ? <LoginForm /> : <RegisterForm />}
			</Flex>
		</>
	)
}

export default AuthScreen