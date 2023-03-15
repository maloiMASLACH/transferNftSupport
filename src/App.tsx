import 'normalize.css'
import 'react-photo-view/dist/react-photo-view.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reflect-metadata'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'inversify-react'
import { FC, memo, NamedExoticComponent } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { appContainer } from './config/inversify.config'
import { AccountsProvider } from './hooks/useAccounts'
import { Router } from './Router'
import { WrapperProps } from './types'

export const queryClient = new QueryClient()

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
})

export const App: FC = () => {
  return (
    <AppWrapper>
      <Router />
    </AppWrapper>
  )
}

const AppWrapper: NamedExoticComponent<WrapperProps> = memo((props: WrapperProps) => {
  const { children } = props

  return (
    <CacheProvider value={muiCache}>
      <QueryClientProvider client={queryClient}>
        <Provider container={appContainer}>
          <AccountsProvider>{children}</AccountsProvider>
        </Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </CacheProvider>
  )
})
