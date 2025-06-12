import { OzenProvider, themeOzenDefault } from '@ozen-ui/kit/OzenProvider'
import stl from './theme-provider.module.scss'
import { SnackbarProvider } from '@ozen-ui/kit/Snackbar'

export const ThemeProvider = ({ children }) => {
  return (
    <OzenProvider
      className={stl.provider}
      ssr={{ isEnabled: false }}
      theme={themeOzenDefault}
    >
      <SnackbarProvider maxMessages={4}>{children}</SnackbarProvider>
    </OzenProvider>
  )
}
