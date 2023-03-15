if (
  !process.env.REACT_APP_INFURA_API_KEY ||
  !process.env.REACT_APP_EXTERNAL_WALLET ||
  !process.env.REACT_APP_CONTRACT_ADDRESS
) {
  throw Error('Not enough env')
}

export const config = {
  isDev: process.env.REACT_APP_DEVELOPMENT,
  string1: process.env.REACT_APP_INFURA_API_KEY,
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
  chain: process.env.REACT_APP_CHAIN || 'testNet',
  externalWallet: process.env.REACT_APP_EXTERNAL_WALLET,
}
