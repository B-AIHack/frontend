import { DataGrid } from '@/widgets/data-grid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ozen-ui/kit/ButtonNext'
import { Stack } from '@ozen-ui/kit/Stack'
import { Indicator } from '@ozen-ui/kit/Indicator'
import { Typography } from '@ozen-ui/kit/Typography'
import { LoadContract } from '@/widgets/contracts/load-contract'
import { spacing } from '@ozen-ui/kit/MixSpacing'

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
            title: t('contractsPage.number'),
            columnKey: 'number',
            render: (item) => item.number,
            width: '200'
          },
          {
            title: t('contractsPage.dateTime'),
            columnKey: 'dateTime',
            render: (item) => item.dateTime,
            width: '200'
          },
          {
            title: t('contractsPage.status'),
            columnKey: 'dateTime',
            render: (item) => (
              <Stack justify='center' align='center' gap='s'>
                <Indicator size='s' variant='info' />
                <Typography variant='text-xs'>
                  {t('contractsPage.filesLoading')}
                </Typography>
              </Stack>
            )
          },
          {
            render: () => (
              <Button size='2xs' color='secondary'>
                {t('contractsPage.startAnalyze')}
              </Button>
            ),
            align: 'center'
          }
        ]}
        dataSource={[
          {
            number: '120123123',
            dateTime: '24.08.2025 14:32',
            status: 'LOADING'
          },
          {
            number: 122
          },
          {
            number: 124
          }
        ]}
        idKey='id'
        isFetching={false}
        page={page}
        pageSize={size}
        totalCount={1111}
        handlePageChange={handlePageChange}
        handleSizeChange={handleSizeChange}
      />
    </div>
  )
}
