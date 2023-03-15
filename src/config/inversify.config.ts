import { Container } from 'inversify'

import { IMetamask, Metamask } from '@/services'
import { Contract, IContract } from '@/services/contract'

export const appContainer = new Container({ defaultScope: 'Singleton' })
appContainer.bind<IMetamask>(IMetamask.$).to(Metamask)
appContainer.bind<IContract>(IContract.$).to(Contract)
