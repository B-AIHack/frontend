import { menuConfig } from '@/configs/menu.jsx'
import { matchPath, useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

export const useMenu = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()

  return menuConfig.map((item) => ({
    selected: Boolean(matchPath(item.path + '/*', location.pathname)),
    label: t(item.tKey),
    icon: item.icon,
    onClick: () => {
      navigate(item.path)
    }
  }))
}
