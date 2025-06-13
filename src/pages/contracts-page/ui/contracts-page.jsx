import { DataGrid } from '@/widgets/data-grid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ozen-ui/kit/ButtonNext'
import { Stack } from '@ozen-ui/kit/Stack'
import { Indicator } from '@ozen-ui/kit/Indicator'
import { Typography } from '@ozen-ui/kit/Typography'
import { LoadContract } from '@/widgets/contracts/load-contract'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import { IconButton } from '@ozen-ui/kit/IconButtonNext'
import { MenuVerticalIcon } from '@ozen-ui/icons'
import { useContractsQuery } from '@/entities/contracts'
import stl from './contracts-page.module.scss'

export const ContractsPage = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const handleSizeChange = (size) => {
    setPage(0)
    setSize(size)
  }

  const handlePageChange = (nextPage) => {
    setPage(nextPage)
  }

  const header = null

  const { data: contracts, isFetching } = useContractsQuery({ page, size })

  return (
    <div>
      <Stack justify='end' fullWidth className={spacing({ mb: '2xl' })}>
        <LoadContract />
      </Stack>

      <DataGrid
        calculateHeightValue='240'
        header={header}
        columns={[
          {
            title: '#',
            columnKey: 'id',
            render: (item) => item.id,
            width: '60'
          },
          {
            title: t('contractsPage.number'),
            columnKey: 'number',
            render: (item) => (
              <Typography className={stl.number} variant='text-s'>
                {item.contractNumber}
              </Typography>
            ),
            width: '140'
          },
          {
            title: t('contractsPage.dateTime'),
            columnKey: 'dateTime',
            render: (item) => item.createdAt,
            width: '200'
          },
          {
            title: t('contractsPage.status'),
            columnKey: 'status',
            render: (item) => {
              const variantMap = {
                NEW: 'info',
                PROCESSING: 'warning',
                FINISHED: 'success'
              }

              return (
                <Stack justify='center' align='center' gap='s'>
                  <Indicator size='s' variant={variantMap[item.status]} />
                  <Typography variant='text-xs'>
                    {t(`contractsPage.statusOptions.${item.status}`)}
                  </Typography>
                </Stack>
              )
            }
          },
          {
            render: () => (
              <Button size='2xs' color='secondary'>
                {t('contractsPage.startAnalyze')}
              </Button>
            ),
            align: 'right',
            columnKey: 'call-to-action'
          },
          {
            width: '40',
            render: () => (
              <IconButton size='2xs' variant='ghost' icon={MenuVerticalIcon} />
            ),
            align: 'right'
          }
        ]}
        dataSource={contracts?.data?.rows ?? []}
        idKey='id'
        isFetching={isFetching}
        page={page}
        pageSize={size}
        totalCount={contracts?.data?.totalElementSize ?? 0}
        handlePageChange={handlePageChange}
        handleSizeChange={handleSizeChange}
      />
    </div>
  )
}
