import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { Providers } from './providers'
import { ContractsPage } from '@/pages/contracts-page'
import { Layout } from '@/widgets/layout'
import dayjs from 'dayjs'
import './i18n.js'

import 'dayjs/locale/ru'
import { DetailPage } from '@/pages/detail-page'

dayjs.locale('ru')

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
            Component: ContractsPage,
            handle: {
              tKey: 'layout.sider.menu.foreignContracts',
              withButton: false
            }
          },
          {
            path: '/foreign-contracts/:id',
            Component: DetailPage,
            handle: {
              tKey: 'contractAnalyze.title',
              withButton: true
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
