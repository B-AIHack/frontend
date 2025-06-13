import { useMutation, useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'

export const useUploadMutation = () =>
  useMutation({
    mutationFn: (formData) => request.post('/file/upload', formData)
  })

export const useCreateContractMutation = () =>
  useMutation({
    mutationFn: (data) => request.post('/application', data)
  })

export const useContractsQuery = (filter) =>
  useQuery({
    queryKey: ['contracts', filter],
    queryFn: async (context) => {
      const filter = context.queryKey.at(1)

      return await request.get('/application/page', { params: { ...filter } })
    }
  })
