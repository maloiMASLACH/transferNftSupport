import { ChainIds } from 'wallets-wrapper'

const envToChain: Record<string, { chain: ChainIds; explorer: string }> = {
  ['testNet']: { chain: ChainIds.GoerliTestNetwork, explorer: 'https://goerli.etherscan.io/' },
  ['mainNet']: { chain: ChainIds.EthereumMainNetwork, explorer: 'https://goerli.etherscan.io/' },
  ['palmNet']: {
    chain: ChainIds.Palm,
    explorer: 'https://explorer.palm.io/',
  },
}

const chain = process.env.REACT_APP_NET || 'palmNet'

export const chainData = envToChain[chain]
