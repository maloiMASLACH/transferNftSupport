import { ethers } from 'ethers'
import { injectable } from 'inversify'
import { toast } from 'react-toastify'
import { BehaviorSubject, from, map, Observable } from 'rxjs'
import {
  ChainIds,
  ChainInfo,
  IProviderRpcError,
  MetamaskWrapper,
  networks,
  WalletsNames,
  WalletsWrapper,
} from 'wallets-wrapper'

import { config } from '@/config/config'
import { chainData } from '@/constants/chainData'

import { IMetamask } from './metamask.types'

@injectable()
export class Metamask implements IMetamask {
  wallet = new WalletsWrapper({
    type: WalletsNames.Metamask,
    infuraApiKey:
      process.env.REACT_APP_INFURA_API_KEY || '0x0000000000000000000000000000000000000000',
  })
  address$: Observable<string> = this.wallet.address$.pipe(
    map((addresses) => addresses[0] || '0x0000000000000000000000000000000000000000'),
  )
  network$: Observable<ChainInfo | null> = this.wallet.chainId$
  balance$ = new BehaviorSubject(0)

  constructor() {
    this.init = this.init.bind(this)
    this.getAddress = this.getAddress.bind(this)
    this.connectWallet = this.connectWallet.bind(this)
    this.getStandardContract = this.getStandardContract.bind(this)
    this.openOnMobile = this.openOnMobile.bind(this)
    this.switchNetwork = this.switchNetwork.bind(this)
    this.checkERC20Balance = this.checkERC20Balance.bind(this)

    this.address$.subscribe((address) =>
      from(this.wallet.getBalance({ address, network: chainData.chain }))
        .pipe(map(([balance]) => balance))
        .subscribe((balance) => this.balance$.next(balance)),
    )
  }

  async init() {
    try {
      return await this.wallet.init({} as never)
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
      return false
    }
  }

  async getAddress() {
    try {
      const addresses = await this.wallet.getAddress()

      return addresses[0] || ''
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
      return ''
    }
  }

  async connectWallet() {
    try {
      return (await this.wallet.connectWallet())[0]
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
      return ''
    }
  }

  async switchNetwork() {
    try {
      const nativeWallet = await this.wallet.getWallet()
      await (nativeWallet as MetamaskWrapper).switchNetwork(chainData.chain)
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
    }
  }

  async getStandardContract(address: string, network?: ChainIds) {
    const contract = await this.wallet.getStandardContract(address, network)

    return contract
  }

  async getSigner() {
    try {
      const provider = await this.wallet.getProvider()
      const signer = (provider as ethers.providers.Web3Provider).getSigner()

      return signer
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
    }
  }

  openOnMobile() {
    window.open((this.wallet.getWallet() as MetamaskWrapper).getMobileLink())
  }

  async checkERC20Balance(address: string) {
    try {
      const contract = await this.wallet.getStandardContract(address)
      await contract.init()

      const balance = await contract.getBalance()

      return Number(balance[0].balance)
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
      return 0
    }
  }

  async approveERC20Token(ERC20address: string, address: string, amount: string) {
    try {
      const contract = await this.wallet.getStandardContract(ERC20address)
      await contract.init()

      const tx = await contract.approve({ address, amount })

      await tx.wait()
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
    }
  }
}
