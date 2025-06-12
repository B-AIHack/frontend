import { Loader } from '@ozen-ui/kit/Loader'
import stl from './centered-loader.module.scss'
import { Typography } from '@ozen-ui/kit/Typography'
import { Stack } from '@ozen-ui/kit/Stack'

export const CenteredLoader = ({ open, label }) => {
  return (
    <>
      {open && (
        <Stack
          direction='column'
          justify='center'
          align='center'
          gap='s'
          className={stl.container}
        >
          <Loader size='m' />
          <Typography>{label}</Typography>
        </Stack>
      )}
    </>
  )
}
