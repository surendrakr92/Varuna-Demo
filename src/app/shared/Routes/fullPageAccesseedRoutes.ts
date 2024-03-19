import { Routes } from '@angular/router'

export const moduleLevelRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/main/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/main/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'master',
    loadChildren: () => import('src/app/main/master/master.module').then(m => m.MasterModule)
  },
  {
    path: 'event-management',
    loadChildren: () => import('src/app/main/event-management/event-management.module').then(m => m.EventManagementModule)
  },
  {
    path: 'market',
    loadChildren: () => import('src/app/main/market-management/market-management.module').then(m => m.MarketManagementModule)
  },
  {
    path: 'indent',
    loadChildren: () => import('src/app/main/indent-management/indent-management.module').then(m => m.IndentManagementModule)
  },
  {
    path: 'fleet',
    loadChildren: () => import('src/app/main/fleet/fleet.module').then(m => m.FleetModule)
  },
  {
    path: 'stationery',
    loadChildren: () => import('src/app/main/stationery/stationery.module').then(m => m.StationeryModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('src/app/main/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'Operations',
    loadChildren: () => import('src/app/main/operations/operations.module').then(m => m.OperationsModule)
  },
]