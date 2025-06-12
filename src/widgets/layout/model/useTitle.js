import { useMatches } from 'react-router'
import { useTranslation } from 'react-i18next'

export const useTitle = () => {
  const matches = useMatches()
  const { t } = useTranslation()

  const handle = matches.at(-1)?.handle

  return {
    withButton: Boolean(handle?.withButton),
    title: t(handle?.tKey ?? '')
  }
}
