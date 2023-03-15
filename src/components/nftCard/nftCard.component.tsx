import './nftCard.styles.css'

import { useInjection } from 'inversify-react'
import React, { useEffect, useState } from 'react'

import { IContract } from '@/services'

import { NftCardProps } from './nftCard.model'

export const NftCard: React.FC<NftCardProps> = ({ id }) => {
  const [cardData, setCardData] = useState<{ name: string; url: string }>({ name: '', url: '' })
  const { getNftDataById, transfer } = useInjection<IContract>(IContract.$)

  useEffect(() => {
    getNftDataById(`${id}`).then((url) =>
      fetch(url).then((response) =>
        response.json().then((nftInfo) => {
          setCardData({ name: nftInfo['name'], url: nftInfo['image'] })
        }),
      ),
    )
  }, [])

  const handleTransfer = () => {
    transfer([id])
  }

  return (
    <div className="nftWrapper">
      <div
        className="nftImage"
        style={{ background: `url(${cardData.url}) no-repeat center/100%` }}
      />
      <p className="nftName">{cardData.name}</p>
      <p className="transferNft" onClick={handleTransfer}>
        Transfer to project
      </p>
    </div>
  )
}
