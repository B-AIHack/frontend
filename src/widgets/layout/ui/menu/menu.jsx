import {
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuList
} from '@ozen-ui/kit/Menu'
import stl from './menu.module.scss'
import { useMenu } from '../../model/useMenu.js'

export const Menu = () => {
  const menu = useMenu()

  const renderContentMenu = () => (
    <>
      {menu.map((menuItem) => (
        <MenuItem selected={menuItem.selected} onClick={menuItem.onClick}>
          <MenuItemIcon>{menuItem.icon}</MenuItemIcon>
          <MenuItemText primary={menuItem.label} />
        </MenuItem>
      ))}
    </>
  )

  return (
    <MenuList size='s' className={stl.menu}>
      {renderContentMenu()}
    </MenuList>
  )
}
