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

export const ExecuteButton = ({ disabled }) => {
  const { t } = useTranslation()
  const containerRef = useRef()
  const [open, { on, off }] = useBoolean()

  const [compliance, { toggle: toggleCompliance }] = useBoolean()
  const [control, { toggle: toggleControl }] = useBoolean()

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
              checked={compliance}
              label={t('compliance')}
              onChange={toggleCompliance}
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
            <DrawerFooterButton>
              {t('executeButton.execute')}
            </DrawerFooterButton>
          </DrawerFooterButtonsGroup>
        </DrawerFooter>
      </Drawer>
    </div>
  )
}
