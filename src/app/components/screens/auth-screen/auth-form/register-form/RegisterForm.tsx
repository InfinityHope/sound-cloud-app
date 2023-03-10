import { UploadImage } from '@/app/components/ui'
import { animationsConfig } from '@/config/animations.config'
import { useAuth, useRegister } from '@/hooks/auth-hooks'
import { useMaskInput } from '@/hooks/useMaskInput'
import { IRegisterFields } from '@/types/interfaces/auth.interface'
import { ArrowBackIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
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
	InputRightElement
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../AuthForm.module.scss'

const MotionFlex = motion(Flex)

const RegisterForm = () => {
	const { setAuthType } = useAuth()
	const { handlePhoneInput } = useMaskInput()
	const [image, setImage] = useState<Blob | null>(null)
	const [showPass, setShowPass] = useState<boolean>(false)

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
				??????????????????????
			</Heading>
			<FormControl width={'fit-content'} textAlign={'center'} marginTop={'1.5em'}>
				<UploadImage
					upload={true}
					setImage={setImage}
					image={image}
					initialImage={'image/noAvatar.png'}
					width={'100px'}
					height={'100px'}
					borderRadius={'full'}
				/>
			</FormControl>
			<FormControl isInvalid={!!errors.email}>
				<FormLabel>E-mail</FormLabel>
				<Input
					type='email'
					{...register('email', {
						required: '???????? ?????????????????????? ?????? ????????????????????"',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: '???????????????? ???????????? E-mail '
						}
					})}
				/>
				{errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.password}>
				<FormLabel>????????????</FormLabel>
				<InputGroup size='md'>
					<Input
						pr='4.5rem'
						type={showPass ? 'text' : 'password'}
						{...register('password', {
							required: '???????? ?????????????????????? ?????? ????????????????????',
							minLength: {
								value: 4,
								message: '???????????? ???????????? ???????? ?????????? 4 ????????????????'
							},
							maxLength: {
								value: 16,
								message: '???????????? ???????????? ???????? ?????????? 16 ????????????????'
							}
						})}
					/>
					<InputRightElement>
						<Button
							variant={'link'}
							onMouseUp={() => setShowPass(false)}
							onMouseDown={() => setShowPass(true)}
						>
							{showPass ? <ViewOffIcon /> : <ViewIcon />}
						</Button>
					</InputRightElement>
				</InputGroup>
				{errors.password && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.name}>
				<FormLabel>??????</FormLabel>
				<Input
					type='text'
					{...register('name', {
						required: '???????? ?????????????????????? ?????? ????????????????????'
					})}
				/>
				{errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.nickName}>
				<FormLabel>??????????????</FormLabel>
				<Input
					type='text'
					{...register('nickName', {
						required: '???????? ?????????????????????? ?????? ????????????????????'
					})}
				/>
				{errors.nickName && <FormErrorMessage>{errors.nickName?.message}</FormErrorMessage>}
			</FormControl>
			<FormControl isInvalid={!!errors.telephone}>
				<FormLabel>??????????????</FormLabel>
				<InputGroup>
					<InputLeftElement pointerEvents='none' children={<PhoneIcon color='white' />} />
					<Input
						type='tel'
						maxLength={18}
						onInput={handlePhoneInput}
						{...register('telephone', {
							required: '???????? ?????????????????????? ?????? ????????????????????',
							pattern: {
								value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
								message: '???????????????????????? ?????????? ????????????????'
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
					???????????????????????????????????? ?????? ???????????????????????
				</Checkbox>
			</FormControl>
			<Button width={'100%'} type={'submit'}>
				????????????????????????????????????
			</Button>
		</MotionFlex>
	)
}

export default RegisterForm
