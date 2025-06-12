import { Stack } from '@ozen-ui/kit/Stack'
import { Pagination } from '@ozen-ui/kit/Pagination'
import { Typography } from '@ozen-ui/kit/Typography'
import { FunctionButtonSelect } from '@/shared/ui/function-button-select'
import { useTranslation } from 'react-i18next'

const pageSizeOptions = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  }
]

export const DataGridPagingFooter = ({
  totalCount,
  page,
  pageSize,
  handlePageChange,
  handleSizeChange
}) => {
  const { t } = useTranslation()
  const ofTotalCountLabel = `/ ${totalCount}`

  return (
    <Stack fullWidth justify='spaceBetween' align='center'>
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        page={page}
      />
      <Stack gap='s'>
        <Typography>{t('dataGrid.visibleItemsAmount')}</Typography>
        <FunctionButtonSelect
          value={pageSize}
          onChange={handleSizeChange}
          options={pageSizeOptions}
        />
        <Typography>{ofTotalCountLabel}</Typography>
      </Stack>
    </Stack>
  )
}
