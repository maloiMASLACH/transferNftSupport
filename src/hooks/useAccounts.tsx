/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMediaQuery, useTheme } from '@mui/material'
import { useInjection } from 'inversify-react'
import { createContext, memo, NamedExoticComponent, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ChainInfo, IProviderRpcError } from 'wallets-wrapper'

import { IContract, IMetamask, Metamask } from '../services'
import { WrapperProps } from '../types'
import { useSubscription } from './useSubscription.hook'

const initValue = {
  address: '',
  isConnected: false,
  network: null,
  isRightNetwork: false,
}
interface InitValue {
  address: string
  isConnected: boolean
  network: ChainInfo | null
  isRightNetwork: boolean
}

const AccountsContext = createContext<InitValue>(initValue)

export const useAccounts = () =>
  useContext(AccountsContext) || [
    [],
    () => {
      toast.error('Something wrong with metamask')
    },
  ]

export const AccountsProvider: NamedExoticComponent<WrapperProps> = memo((props: WrapperProps) => {
  const { children } = props
  const { init, address$, getAddress, network$, connectWallet, openOnMobile, switchNetwork } =
    useInjection<IMetamask>(IMetamask.$)
  const { data$ } = useInjection<IContract>(IContract.$)
  const { network: contractNetwork } = useSubscription(data$) || {}

  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('md'))
  const [address, setAddress] = useState('')
  const network = useSubscription(network$)
  const isConnected = !!address
  const isRightNetwork = contractNetwork === network?.chainId

  useEffect(() => {
    init()
      .then(async (isInstalled) => {
        await switchNetwork()

        address$.subscribe(setAddress)
        const address = await getAddress()

        if (address) {
          setAddress(address)
        } else if (isInstalled) {
          if (match) {
            openOnMobile()
          } else {
            await connectWallet().then(setAddress)
          }
        }
      })
      .catch((error) => toast.error((error as IProviderRpcError).message))
  }, [match])

  return (
    <AccountsContext.Provider value={{ address, isConnected, network, isRightNetwork }}>
      {children}
    </AccountsContext.Provider>
  )
})
