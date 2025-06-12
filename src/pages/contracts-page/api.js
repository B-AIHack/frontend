import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient, request } from '@/shared/api'

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => request.get('/users')
  })

export const useDeleteUser = () =>
  useMutation({
    mutationFn: () => request.post('/users'),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
