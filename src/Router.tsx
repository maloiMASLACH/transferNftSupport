import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { HomeComponent } from './pages'

export const Routers = [
  {
    name: '/',
    Component: () => <HomeComponent />,
  },
]

export const Router: FC = () => {
  return (
    <Routes>
      {Routers.map(({ name, Component }) => (
        <Route key={name} path={name} element={<Component />} />
      ))}

      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}
