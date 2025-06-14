import { Stack } from '@ozen-ui/kit/Stack'
import { Tab, Tabs } from '@ozen-ui/kit/Tabs'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import { Typography } from '@ozen-ui/kit/Typography'
import { useState } from 'react'

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <div className={spacing({ py: 'l' })}>
        <Typography>{children}</Typography>
      </div>
    )}
  </div>
)

export const BaseTabs = ({ config }) => {
  const [value, setValue] = useState(0)

  return (
    <Stack direction='column' fullWidth>
      <Tabs value={value} onChange={(_, value) => setValue(value)}>
        {config.map((configItem, index) => (
          <Tab
            iconRight={configItem.iconRight}
            label={configItem.label}
            key={index}
            value={index}
            disabled={configItem.disabled}
          />
        ))}
      </Tabs>
      {config.map((configItem, index) => (
        <TabPanel value={value} index={index} key={index}>
          {configItem.content}
        </TabPanel>
      ))}
    </Stack>
  )
}
