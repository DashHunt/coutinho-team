import type { RouteObject } from 'react-router-dom'
import { loginPageRoute } from './login/login.route'
import { homePageRoute } from './home/home.route'
import { leadsPageRoute } from './leads/leads.route'
import { clientsPageRoute, clientDetailPageRoute } from './clients/clients.route'
import { plansPageRoute } from './plans/plans.route'
import { ProtectedRoute } from '../shared/router/ProtectedRoute'
import { AppLayout } from '../shared/layouts/AppLayout'

// Agrega as rotas de todas as páginas
export const routes: RouteObject[] = [
  loginPageRoute,
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: AppLayout,
        children: [homePageRoute, leadsPageRoute, clientsPageRoute, clientDetailPageRoute, plansPageRoute],
      },
    ],
  },
]
