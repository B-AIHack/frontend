import { Button } from '@ozen-ui/kit/ButtonNext'
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from '@ozen-ui/kit/DialogNext'
import { Input } from '@ozen-ui/kit/Input'
import { useBoolean } from '@ozen-ui/kit/useBoolean'
import { useTranslation } from 'react-i18next'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import stl from './load-contract.module.scss'
import { useState } from 'react'
import {
  FileUploader,
  FileUploaderDrop,
  FileUploaderList
} from '@ozen-ui/kit/FileUploader'
import { prepareFiles, useUploader } from '../model/useUploader.js'
import { Stack } from '@ozen-ui/kit/Stack'
import { useSnackbar } from '@ozen-ui/kit/Snackbar'
import { Typography } from '@ozen-ui/kit/Typography'
import { useCreateContractMutation } from '@/entities/contracts'

export const LoadContract = ({ refresh }) => {
  const { mutateAsync: createAsync } = useCreateContractMutation()

  const [open, { on, off }] = useBoolean(false)
  const { t } = useTranslation()
  const { pushMessage } = useSnackbar()

  const [contractNumber, setContractNumber] = useState('')
  const filesControl = useUploader()

  const onSubmit = async () => {
    if (contractNumber.length === 0 || filesControl.loadedFiles.length === 0) {
      pushMessage({
        title: t('contractsPage.validation'),
        status: 'warning'
      })
    }

    await createAsync({
      contractNumber,
      uploadedFileIds: Object.values(filesControl.loadedFiles).map(
        (file) => file.id
      )
    })

    off()
    refresh?.()
  }

  return (
    <>
      <Button size='s' onClick={on}>
        {t('contractsPage.loadContract')}
      </Button>
      <Dialog open={open} onClose={off} deviceType='desktop'>
        <DialogHeader>
          <DialogTitle>{t('contractsPage.loadContract')}</DialogTitle>
        </DialogHeader>
        <DialogBody className={stl.body}>
          <Input
            fullWidth
            value={contractNumber}
            onChange={(e) => setContractNumber(e.target.value)}
            className={spacing({ mb: '2xl' })}
            label={t('contractsPage.number')}
          />

          <Typography className={spacing({ mb: 'xs' })}>
            {t('contractsPage.contract') + ':'}
          </Typography>
          <FileUploader
            className={stl.uploader}
            files={filesControl.files}
            prepareFiles={(files) => prepareFiles(files, filesControl)}
            onChange={filesControl.onChange}
            onDelete={(fileInfo) => filesControl.deleteFile(fileInfo.id)}
            allow={filesControl.allow}
            drop={
              <FileUploaderDrop
                button={t('uploaderDrop.button')}
                hint={t('uploaderDrop.hint')}
                label={t('uploaderDrop.label')}
              />
            }
            accept='application/pdf'
          >
            <FileUploaderList />
          </FileUploader>
        </DialogBody>
        <DialogFooter>
          <Stack fullWidth justify='end' gap='m'>
            <Button
              onClick={off}
              variant='contained-additional'
              color='secondary'
            >
              {t('contractsPage.close')}
            </Button>
            <Button onClick={onSubmit}>{t('contractsPage.load')}</Button>
          </Stack>
        </DialogFooter>
      </Dialog>
    </>
  )
}
