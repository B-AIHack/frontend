import { OzenProvider, themeOzenDark } from '@ozen-ui/kit/OzenProvider'
import { Paper } from '@ozen-ui/kit/Paper'
import stl from './sider.module.scss'
import { Stack } from '@ozen-ui/kit/Stack'
import { BerekeIcon } from '@ozen-ui/icons'
import { Typography } from '@ozen-ui/kit/Typography'
import { useTranslation } from 'react-i18next'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import { Divider } from '@ozen-ui/kit/Divider'
import { Menu } from '../menu'
import { Avatar } from '@ozen-ui/kit/Avatar'

export const Sider = () => {
  const { t } = useTranslation()

  return (
    <OzenProvider theme={themeOzenDark} ssr={{ isEnabled: false }}>
      <Paper className={stl.sider} background='main'>
        <Stack
          gap='s'
          fullWidth
          className={spacing({ px: 's', py: 'm' })}
          align='center'
        >
          <Stack justify='center' align='center' className={stl.iconContainer}>
            <BerekeIcon className={stl.icon} />
          </Stack>
          <Typography variant='text-m_1' color='accentPrimary'>
            {t('layout.sider.title')}
          </Typography>
        </Stack>
        <Divider flexItem color='secondary' className={spacing({ mb: 'm' })} />
        <div className={stl.menuContainer}>
          <Menu />
        </div>
        <div className={stl.accountContainer}>
          <Stack
            fullWidth
            gap='m'
            align='center'
            className={spacing({ mx: 's', my: 'l' })}
          >
            <Avatar
              size='xs'
              src='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80'
              online
            />
            <div>
              <Typography variant='text-m_1'>
                {t('layout.sider.user')}
              </Typography>
              <Typography variant='text-2xs' color='success'>
                {t('layout.sider.online')}
              </Typography>
            </div>
          </Stack>
        </div>
      </Paper>
    </OzenProvider>
  )
}
