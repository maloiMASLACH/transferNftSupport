import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { App } from '@/App'

const rootElement = document.getElementById('root')

const root = rootElement && ReactDOM.createRoot(rootElement)

root?.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />}></Route>
    </Routes>
  </BrowserRouter>,
)
