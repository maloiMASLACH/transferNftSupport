import { ethers } from 'ethers'
import { inject, injectable } from 'inversify'
import { toast } from 'react-toastify'
import { BehaviorSubject } from 'rxjs'
import { getProvider, IProviderRpcError } from 'wallets-wrapper'

import { config } from '@/config/config'
import customAbi from '@/config/erc721.abi.json'
import { chainData } from '@/constants/chainData'
import usersMockData from '@/constants/users.json'

import { IMetamask } from '../metamask'
import { IContract } from './contract.types'

@injectable()
export class Contract implements IContract {
  @inject(IMetamask.$) private metamask: IMetamask | undefined

  contract: ethers.Contract

  data$ = new BehaviorSubject({
    address: config.contractAddress,
    network: chainData.chain,
    explorer: chainData.explorer,

    decimals: 0,
    totalSupply: 0,
    name: '',
    symbol: '',

    transferFee: 0,
    tokenPrice: 0,
    minBuyAmount: 1,
    minReserveAmount: 1,
    contractBalance: 0,
    rollOverFee: 0,
    rollOverEpochDuration: '',
    silverRatio: 0,
    usdcAddress: '',
  })

  constructor() {
    this.getNftsByUserAddress = this.getNftsByUserAddress.bind(this)
    this.transfer = this.transfer.bind(this)
    this.getNftDataById = this.getNftDataById.bind(this)

    const data = this.data$.getValue()

    const provider = getProvider(data.network)
    this.contract = new ethers.Contract(data.address, customAbi, provider)
  }

  async getNftsByUserAddress() {
    try {
      if (this.metamask) {
        const address = await this.metamask.getAddress()

        const nftsId: number[] = []

        const promises = []
        for (let i = 1; i <= usersMockData.length; i++) {
          const promise = this.contract.ownerOf(i)
          promises.push(promise)
        }

        await Promise.all(promises)
          .then((results) => results.map((el, index) => el === address && nftsId.push(index + 1)))
          .catch((error) => console.error(error))

        return nftsId
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    return []
  }

  async getNftDataById(id: string) {
    try {
      if (this.metamask) {
        const data = await this.data$.getValue()
        const contract = await this.metamask.getStandardContract(data.address)
        await contract.init()

        const cardData = await contract.getTokenUri(id)

        return cardData
      }
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
    }
    return ''
  }

  async transfer(ids: number[]) {
    try {
      if (this.metamask) {
        const data = await this.data$.getValue()
        const contract = await this.metamask.getStandardContract(data.address)
        await contract.init()

        await contract.transfer({
          addressTo: config.externalWallet,
          tokenIds: ids,
        })
      }
    } catch (error) {
      toast.error((error as IProviderRpcError).message)
    }
  }
}
