import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = `${process.env.API_URL}/api` || 'http://localhost:5000/api'

export const getContentType = () => ({
	'Content-type': 'application/json'
})

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})