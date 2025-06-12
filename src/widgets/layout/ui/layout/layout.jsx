import stl from './layout.module.scss'
import { Sider } from '../sider'
import { Container } from '../container'

export const Layout = () => {
  return (
    <div className={stl.layout}>
      <Sider />
      <Container />
    </div>
  )
}
