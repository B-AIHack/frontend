import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@ozen-ui/kit/Table'
import { useState } from 'react'
import { Typography } from '@ozen-ui/kit/Typography'
import stl from './data-grid-body.module.scss'
import { useTranslation } from 'react-i18next'
import { DataGridHeadRow } from '../data-grid-head-row.jsx'
import { DataGridOverlay } from '../data-grid-overlay.jsx'
import { CenteredLoader } from '@/shared/ui/centered-loader'

export const DataGridBody = ({ columns, dataSource, isFetching, idKey }) => {
  const { t } = useTranslation()

  const overlayVisible = isFetching || (!isFetching && dataSource.length === 0)
  const [tableHeadElement, setTableHeadElement] = useState(null)

  const renderCellContent = ({ column: { render }, item }) => {
    if (render) {
      return render(item)
    }

    return ''
  }

  return (
    <>
      <TableContainer>
        <Table size='s'>
          <TableHead ref={setTableHeadElement} className={stl.head}>
            <DataGridHeadRow columns={columns} />
          </TableHead>
          <TableBody>
            {dataSource.map((item) => {
              return (
                <TableRow key={item[idKey]}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${(column?.columnKey ?? column.title) || 'actions'}-row-${item[idKey]}`}
                      align={column.align}
                      verticalAlign={column.verticalAlign ?? 'middle'}
                      width={column.width}
                    >
                      {renderCellContent({ column, item })}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DataGridOverlay
        open={overlayVisible}
        top={tableHeadElement?.offsetHeight}
      >
        {isFetching && (
          <div className={stl.loaderContainer}>
            <CenteredLoader open size='m' />
          </div>
        )}
        {!isFetching && dataSource.length === 0 && (
          <div className={stl.notFoundContainer}>
            <Typography>{t('dataGrid.nothingFound')}</Typography>
          </div>
        )}
      </DataGridOverlay>
    </>
  )
}
