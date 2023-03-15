import { ethers } from 'ethers'
import { interfaces } from 'inversify'
import { Observable } from 'rxjs'
import { ChainIds, ChainInfo, StandardContract } from 'wallets-wrapper'

export interface IMetamask {
  address$: Observable<string>
  network$: Observable<ChainInfo | null>
  balance$: Observable<number>
  init(): Promise<boolean>
  getAddress(): Promise<string>
  connectWallet(): Promise<string>
  getStandardContract(address: string, network?: ChainIds): Promise<StandardContract>
  getSigner(): Promise<ethers.providers.JsonRpcSigner | undefined>
  openOnMobile(): void
  switchNetwork(): Promise<void>
  checkERC20Balance(address: string): Promise<number>
  approveERC20Token(ERC20address: string, address: string, amount: string): Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IMetamask {
  export const $: interfaces.ServiceIdentifier<IMetamask> = Symbol('Metamask')
}
