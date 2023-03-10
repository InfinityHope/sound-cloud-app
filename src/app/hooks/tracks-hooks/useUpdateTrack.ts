import { useNotification } from '@/hooks/useNotification'
import { TrackService } from '@/services/track-service/track.service'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { queryClient } from './../../config/react-query.config'

export const useUpdateTrack = (trackId: number) => {
	const { errorMessage, successMessage } = useNotification()
	const { mutate: updateTrack } = useMutation(
		['update track', trackId],
		(data: FormData) => TrackService.updateTrack(trackId, data),
		{
			onSuccess: (response: { id: number; status: number; message: string }) => {
				Promise.all([
					queryClient.invalidateQueries('track info'),
					queryClient.invalidateQueries('track list')
				]).then(() => {
					successMessage(`Успешно`, `${response.message}`)
				})
			},
			onError: (error: AxiosError<{ status: number; message: string }>) => {
				if (error) {
					errorMessage(
						`${error.response?.data.status}`,
						`${error.response?.data.message}`
					)
				}
			}
		}
	)

	return updateTrack
}
