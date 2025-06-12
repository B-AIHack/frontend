import { DataGridContainer } from './data-grid-container'
import { DataGridBody } from './data-grid-body'
import { DataGridPagingFooter } from './data-grid-footer.jsx'

export const DataGrid = ({
  header,
  columns,
  dataSource,
  idKey,
  isFetching,
  page,
  pageSize,
  totalCount,
  handlePageChange,
  handleSizeChange,
  calculateHeightValue
}) => {
  return (
    <DataGridContainer
      calculateHeightValue={calculateHeightValue}
      header={header}
      body={
        <DataGridBody
          columns={columns}
          dataSource={dataSource}
          idKey={idKey}
          isFetching={isFetching}
        />
      }
      footer={
        <DataGridPagingFooter
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
        />
      }
    />
  )
}
