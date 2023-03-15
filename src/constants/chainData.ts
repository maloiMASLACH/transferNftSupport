import { ChainIds } from 'wallets-wrapper'

const envToChain: Record<string, { chain: ChainIds; explorer: string }> = {
  ['testNet']: { chain: ChainIds.GoerliTestNetwork, explorer: 'https://goerli.etherscan.io/' },
  ['mainNet']: { chain: ChainIds.EthereumMainNetwork, explorer: 'https://goerli.etherscan.io/' },
}

const chain = process.env.REACT_APP_CHAIN || 'testNet'

export const chainData = envToChain[chain]
