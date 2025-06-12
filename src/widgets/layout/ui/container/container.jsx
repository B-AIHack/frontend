import { Title, TitleIconButton } from '@ozen-ui/kit/Title'
import { useTitle } from '../../model/useTitle.js'
import { ArrowLeftIcon } from '@ozen-ui/icons'
import { Outlet, useNavigate } from 'react-router'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import stl from './container.module.scss'
import clsx from 'clsx'
import { Stack } from '@ozen-ui/kit/Stack'

export const Container = () => {
  const { title, withButton } = useTitle()
  const navigate = useNavigate()

  const renderRight = withButton ? (
    <TitleIconButton icon={<ArrowLeftIcon />} onClick={() => navigate(-1)} />
  ) : null

  return (
    <div className={stl.container}>
      <Title
        size='s'
        variant='main'
        className={spacing({ pt: 'l' })}
        renderRight={renderRight}
      >
        {title}
      </Title>
      <Stack
        direction='column'
        className={clsx(spacing({ mb: '2xl' }), stl.innerContainer)}
        fullWidth
      >
        <Outlet />
      </Stack>
    </div>
  )
}
