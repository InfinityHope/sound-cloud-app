import { animationsConfig } from '@/config/animations.config'
import { useAuth, useRegister } from '@/hooks/auth-hooks'
import { useMaskInput } from '@/hooks/useMaskInput'
import { IRegisterFields } from '@/types/interfaces/auth.interface'
import { ArrowBackIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../AuthForm.module.scss'

const MotionFlex = motion(Flex)

const RegisterForm: FC = () => {
	const { setAuthType } = useAuth()
	const { handlePhoneInput } = useMaskInput()
	const [image, setImage] = useState<File | null>(null)
	const [showPass, setShowPass] = useState<boolean>(false)

	const inputFileRef = useRef<HTMLInputElement>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, defaultValues }
	} = useForm<IRegisterFields>({
		mode: 'onSubmit',
		defaultValues: {
			isMusician: false
		}
	})

	const registration = useRegister(reset)

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			setImage(file)
		}
	}

	const onSubmit: SubmitHandler<IRegisterFields> = data => {
		const formData = new FormData()
		if (image) {
			formData.append('avatar', image)
		}
		formData.append('email', data.email)
		formData.append('password', data.password)
		formData.append('name', data.name)
		formData.append('nickName', data.nickName)
		formData.append('telephone', data.telephone)
		formData.append('isMusician', data.isMusician.toString())

		setImage(null)
		registration(formData)
	}

	return (
		<MotionFlex
			as={'form'}
			className={styles.AuthForm}
			onSubmit={handleSubmit(onSubmit)}
			initial={'initialFadeScale'}
			animate={'animateFadeScale'}
			transition={{
				opacity: { ease: 'linear' },
				duration: 0.4
			}}
			variants={animationsConfig}
		>
			<Button
				onClick={() => setAuthType('login')}
				variant={'outline'}
				position={'absolute'}
				colorScheme={''}
				top={25}
				left={15}
			>
				<ArrowBackIcon />
			</Button>
			<Heading as='h2' size='xl'>
				Регистрация
			</Heading>
			<FormControl textAlign={'center'} marginTop={'1.5em'}>
				{!image?.name ? (
					<Avatar
						onClick={() => inputFileRef.current && inputFileRef.current.click()}
						cursor={'pointer'}
						name='Dan Abrahmov'
						src={'http://localhost:5000/image/noAvatar.png'}
					/>
				) : (
					<Text
						cursor={'pointer'}
						whiteSpace={'nowrap'}
						overflow={'hidden'}
						textOverflow={'ellipsis'}
						onClick={() => inputFileRef.current && inputFileRef.current.click()}
					>
						Ваш аватар: {image.name}
					</Text>
				)}
				<Input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
			</FormControl>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel>E-mail</FormLabel>
				<Input
					type='email'
					{...register('email', {
						required: 'Поле обязательно для заполнения"',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Неверный формат E-mail '
						}
					})}
				/>
				{errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel>Пароль</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={showPass ? 'text' : 'password'}
						{...register('password', {
							required: 'Поле обязательно для заполнения',
							minLength: {
								value: 4,
								message: 'Пароль должен быть более 4 символов'
							},
							maxLength: {
								value: 16,
								message: 'Пароль должен быть менее 16 символов'
							}
						})}
					/>
					<InputRightElement>
						<Button
							colorScheme={''}
							variant={'link'}
							onClick={() => setShowPass(!showPass)}
						>
							{showPass ? <ViewOffIcon /> : <ViewIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.name}>
				<FormLabel>Имя</FormLabel>
				<Input
					type='text'
					{...register('name', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
				{errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.nickName}>
				<FormLabel>Никнейм</FormLabel>
				<Input
					type='text'
					{...register('nickName', {
						required: 'Поле обязательно для заполнения'
					})}
				/>
				{errors.nickName && <FormErrorMessage>{errors.nickName?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.telephone}>
				<FormLabel>Телефон</FormLabel>
				<InputGroup>
					<InputLeftElement pointerEvents='none' children={<PhoneIcon color='white' />} />
					<Input
						type='tel'
						maxLength={18}
						onInput={handlePhoneInput}
						{...register('telephone', {
							required: 'Поле обязательно для заполнения',
							pattern: {
								value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
								message: 'Некорректный номер телефона'
							}
						})}
					/>
				</InputGroup>
				{errors.telephone && (
					<FormErrorMessage>{errors.telephone?.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl>
				<Checkbox checked={defaultValues?.isMusician} {...register('isMusician')}>
					Зарегистрироваться как исполнитель?
				</Checkbox>
			</FormControl>
			<Button
				size={'lg'}
				colorScheme={'facebook'}
				variant={'solid'}
				width={'100%'}
				type={'submit'}
			>
				Зарегистрироваться
			</Button>
		</MotionFlex>
	)
}

export default RegisterForm