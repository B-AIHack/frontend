import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { Providers } from './providers'
import { MainPage } from '@/pages/main-page'
import { Layout } from '@/widgets/layout'
import './i18n.js'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Providers,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/foreign-contracts',
            Component: MainPage,
            handle: {
              tKey: 'layout.sider.menu.foreignContracts',
              withButton: false
            }
          },
          { index: true, element: <Navigate to={'/foreign-contracts'} /> },
          { path: '*', element: <Navigate to={'/foreign-contracts'} /> }
        ]
      }
    ]
  }
])

export default <RouterProvider router={router} />
