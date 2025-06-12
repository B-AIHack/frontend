import { TableCell, TableRow } from '@ozen-ui/kit/Table'

export const DataGridHeadRow = ({ columns }) => {
  return (
    <TableRow>
      {columns.map(({ title, columnKey, width }) => (
        <TableCell
          align='left'
          key={`${(columnKey ?? title) || 'actions'}-header`}
          width={width}
        >
          {title}
        </TableCell>
      ))}
    </TableRow>
  )
}
