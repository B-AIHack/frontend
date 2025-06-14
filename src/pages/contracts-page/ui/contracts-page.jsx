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
import { CheckIcon, CrossIcon, MenuVerticalIcon } from '@ozen-ui/icons'
import { useContractsQuery } from '@/entities/contracts'
import stl from './contracts-page.module.scss'
import { Input } from '@ozen-ui/kit/Input'
import { DatePicker } from '@ozen-ui/kit/DatePicker'
import { Divider } from '@ozen-ui/kit/Divider'
import { BaseSelect } from '@/shared/ui/base-select'
import { Tooltip } from '@ozen-ui/kit/Tooltip'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'

const initialFilter = {
  dateFrom: dayjs().format('YYYY-MM-DD'),
  dateTo: dayjs().format('YYYY-MM-DD')
}

export const ContractsPage = () => {
  const navigate = useNavigate()
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

  const [contractNumber, setContractNumber] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState([new Date(), new Date()])
  const [filter, setFilter] = useState(initialFilter)

  const reset = () => {
    setContractNumber('')
    setStatus('')
    setDate([new Date(), new Date()])

    setFilter({ ...initialFilter })
  }

  const submit = () => {
    const nextFilter = {}
    if (contractNumber) {
      nextFilter.contractNumber = contractNumber
    }
    if (status) {
      nextFilter.status = status
    }
    if (dayjs(date.at(0)).isValid()) {
      nextFilter.dateFrom = dayjs(date.at(0)).format('YYYY-MM-DD')
    }
    if (dayjs(date.at(1)).isValid()) {
      nextFilter.dateTo = dayjs(date.at(1)).format('YYYY-MM-DD')
    }

    setFilter(nextFilter)
  }

  const header = (
    <Stack
      fullWidth
      gap='m'
      divider={<Divider orientation='vertical' flexItem />}
      justify='spaceBetween'
    >
      <Input
        className={stl.flex1}
        size='s'
        label={t('contractsPage.number')}
        value={contractNumber}
        onChange={(e) => setContractNumber(e.target.value)}
      />
      <DatePicker
        className={stl.flex2}
        value={date}
        onChange={(value) => setDate(value)}
        size='s'
        mode='date-range'
        label={[t('contractsPage.dateFrom'), t('contractsPage.dateTo')]}
      />
      <BaseSelect
        className={stl.flex1}
        label={t('contractsPage.status')}
        size='s'
        options={[
          { label: '', value: '' },
          ...['PARSING', 'NEW', 'PROCESSING', 'FINISHED'].map((item) => ({
            label: t(`contractsPage.statusOptions.${item}`),
            value: item
          }))
        ]}
        value={status}
        onChange={(value) => setStatus(value)}
      />
      <Stack gap='m'>
        <Tooltip label={t('contractsPage.reset')} placement='top'>
          <IconButton
            size='l'
            variant='ghost'
            icon={CrossIcon}
            compressed
            onClick={reset}
          />
        </Tooltip>

        <Tooltip label={t('contractsPage.submit')} placement='top'>
          <IconButton
            size='l'
            variant='contained'
            color='secondary'
            icon={CheckIcon}
            compressed
            onClick={submit}
          />
        </Tooltip>
      </Stack>
    </Stack>
  )

  const { data: contracts, isLoading } = useContractsQuery({
    page,
    size,
    ...filter
  })

  return (
    <div>
      <Stack justify='end' fullWidth className={spacing({ mb: '2xl' })}>
        <LoadContract />
      </Stack>

      <DataGrid
        calculateHeightValue='180'
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
                PARSING: 'warning',
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
            render: (item) => (
              <Button
                size='2xs'
                color='secondary'
                disabled={item.status === 'PARSING'}
                onClick={() => navigate(`/foreign-contracts/${item.id}`)}
              >
                {t('contractsPage.goToAnalyze')}
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
        isFetching={isLoading}
        page={page}
        pageSize={size}
        totalCount={contracts?.data?.totalElementSize ?? 0}
        handlePageChange={handlePageChange}
        handleSizeChange={handleSizeChange}
      />
    </div>
  )
}
