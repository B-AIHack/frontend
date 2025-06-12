import { useRef } from 'react'
import { useBoolean } from '@ozen-ui/kit/useBoolean'
import { Button } from '@ozen-ui/kit/ButtonNext'
import { ChevronDownIcon, ChevronUpIcon } from '@ozen-ui/icons'
import { DataList, DataListOption } from '@ozen-ui/kit/DataList'
import { Stack } from '@ozen-ui/kit/Stack'

export const FunctionButtonSelect = ({
  value,
  onChange,
  options,
  className
}) => {
  const [open, { toggle, off }] = useBoolean()
  const buttonIcon = open ? ChevronUpIcon : ChevronDownIcon
  const anchorRef = useRef()

  const handleSelect = (_, payload) => {
    onChange(payload.value)
  }

  return (
    <Stack className={className}>
      <Button
        ref={anchorRef}
        onClick={toggle}
        iconRight={buttonIcon}
        size='s'
        variant='function'
        fullWidth
      >
        {value}
      </Button>
      <DataList
        open={open}
        size='s'
        anchorRef={anchorRef}
        onClose={off}
        onSelect={handleSelect}
        selected={value}
      >
        {options.map(({ label, value }) => (
          <DataListOption key={value} value={value} label={label} />
        ))}
      </DataList>
    </Stack>
  )
}
