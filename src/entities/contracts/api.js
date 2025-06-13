import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient, request } from '@/shared/api'

export const useUploadMutation = () =>
  useMutation({
    mutationFn: (formData) => request.post('/file/upload', formData)
  })

export const useCreateContractMutation = () =>
  useMutation({
    mutationFn: (data) => request.post('/application', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    }
  })

export const useContractsQuery = (filter) =>
  useQuery({
    queryKey: ['contracts', filter],
    queryFn: async (context) => {
      const filter = context.queryKey.at(1)

      return await request.get('/application/page', { params: { ...filter } })
    }
  })

export const useDetailQuery = (id) =>
  useQuery({
    queryKey: ['detail', id],
    queryFn: async (context) => {
      const id = context.queryKey.at(1)

      return await request.get(`/application/${id}`)
    }
  })
