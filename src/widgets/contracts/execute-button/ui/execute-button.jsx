import { Button } from '@ozen-ui/kit/ButtonNext'
import { useRef } from 'react'
import { useBoolean } from '@ozen-ui/kit/useBoolean'
import stl from './execute-button.module.scss'
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerFooterButton,
  DrawerFooterButtonsGroup,
  DrawerTitle
} from '@ozen-ui/kit/DrawerNext'
import { Toggle } from '@ozen-ui/kit/ToggleNext'
import { Stack } from '@ozen-ui/kit/Stack'
import { useTranslation } from 'react-i18next'
import { useExecuteProcessMutation } from '@/entities/contracts'
import { useSnackbar } from '@ozen-ui/kit/Snackbar'

export const ExecuteButton = ({ disabled, id }) => {
  const { t } = useTranslation()
  const containerRef = useRef()
  const [open, { on, off }] = useBoolean()
  const { pushMessage } = useSnackbar()

  const [findOwners, { toggle: toggleFindOwners }] = useBoolean()
  const [control, { toggle: toggleControl }] = useBoolean()

  const { mutateAsync: execProcess, isPending } = useExecuteProcessMutation()

  const submit = () => {
    // if (!findOwners) {
    //   pushMessage({
    //     status: 'warning',
    //     title: t('executeButton.selectAtLeastOne'),
    //     lifetime: 1500
    //   })
    //
    //   return
    // }

    pushMessage({
      status: 'info',
      title: 'Анализ запущен, нет необходимости запускать повторно'
    })

    execProcess({
      id,
      process: true,
      findOwners: true
    })
  }

  return (
    <div className={stl.container} ref={containerRef}>
      <Button size='xs' onClick={on} disabled={disabled}>
        {t('executeButton.executeAnalysis')}
      </Button>
      <Drawer
        className={stl.drawer}
        size='s'
        open={open}
        deviceType='desktop'
        onClose={off}
      >
        <DrawerHeader>
          <DrawerTitle>{t('executeButton.params')}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack fullWidth gap='m' direction='column'>
            <Toggle
              checked={findOwners}
              label={t('compliance')}
              onChange={toggleFindOwners}
            />
            <Toggle
              checked={control}
              label={t('control')}
              onChange={toggleControl}
            />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerFooterButtonsGroup>
            <DrawerFooterButton color='tertiary' onClick={off}>
              {t('executeButton.close')}
            </DrawerFooterButton>
            <DrawerFooterButton onClick={submit} loading={isPending}>
              {t('executeButton.execute')}
            </DrawerFooterButton>
          </DrawerFooterButtonsGroup>
        </DrawerFooter>
      </Drawer>
    </div>
  )
}
