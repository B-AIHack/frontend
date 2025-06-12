import React from 'react'
import stl from './data-grid-container.module.scss'
import { Stack } from '@ozen-ui/kit/Stack'

export const DataGridContainer = ({
  header,
  body,
  footer,
  calculateHeightValue = 100
}) => {
  const height = `calc(100vh - ${calculateHeightValue}px)`

  return (
    <Stack gap='m' direction='column' fullWidth style={{ height }}>
      {header}
      <div className={stl.body}>{body}</div>
      {footer}
    </Stack>
  )
}
