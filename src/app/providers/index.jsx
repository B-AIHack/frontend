import { ThemeProvider } from './theme-provider'
import { Outlet } from 'react-router'
import { QueryProvider } from './query-provider.jsx'

export const Providers = () => (
  <ThemeProvider>
    <QueryProvider>
      <Outlet />
    </QueryProvider>
  </ThemeProvider>
)
