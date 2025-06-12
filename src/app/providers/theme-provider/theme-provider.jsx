import { OzenProvider, themeOzenDefault } from '@ozen-ui/kit/OzenProvider'
import stl from './theme-provider.module.scss'

export const ThemeProvider = ({ children }) => {
  return (
    <OzenProvider
      className={stl.provider}
      ssr={{ isEnabled: false }}
      theme={themeOzenDefault}
    >
      {children}
    </OzenProvider>
  )
}
