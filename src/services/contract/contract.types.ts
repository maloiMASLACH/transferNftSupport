import { interfaces } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { ChainIds } from 'wallets-wrapper'

export enum BuyModalFieldNames {
  Address = 'address',
  ERC20Amount = 'ERC20Amount',
  TokenAmount = 'TokenAmount',
}

export interface FormBuyModalValues {
  [BuyModalFieldNames.Address]: string
  [BuyModalFieldNames.ERC20Amount]: string
  [BuyModalFieldNames.TokenAmount]: string
}

export interface EventHistory {
  link?: string
  date?: string
  event?: string
}

export interface TokenData {
  decimals: number
  address: string
  network: ChainIds
  explorer: string

  totalSupply: number
  name: string
  symbol: string

  transferFee: number
  tokenPrice: number
  minBuyAmount: number
  minReserveAmount: number
  contractBalance: number
  rollOverFee: number
  rollOverEpochDuration: string
  silverRatio: number
  usdcAddress: string
}

export interface UserData {
  userBalance: number
  userReserves: number
}

export interface HistoryData {
  history: EventHistory[]
}

export interface IContract {
  data$: BehaviorSubject<TokenData>
  getNftsByUserAddress(): Promise<number[]>
  transfer(ids: number[]): Promise<void>
  getNftDataById(id: string): Promise<string>
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IContract {
  export const $: interfaces.ServiceIdentifier<IContract> = Symbol('Contract')
}
