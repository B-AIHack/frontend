import { queryClient } from '@/shared/api'
import { QueryClientProvider } from '@tanstack/react-query'

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
