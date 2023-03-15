import './nftCard.styles.css'

import { useInjection } from 'inversify-react'
import React, { useEffect, useState } from 'react'

import { IContract } from '@/services'

import { NftCardProps } from './nftCard.model'

export const NftCard: React.FC<NftCardProps> = ({ id }) => {
  const [cardData, setCardData] = useState<{ name: string; url: string; animationUrl: string }>({
    name: '',
    url: '',
    animationUrl: '',
  })
  const { getNftDataById, transfer } = useInjection<IContract>(IContract.$)

  useEffect(() => {
    getNftDataById(`${id}`).then((url) =>
      fetch(url).then((response) =>
        response.json().then((nftInfo) => {
          setCardData({
            name: nftInfo['name'],
            url: nftInfo['image'],
            animationUrl: nftInfo['animation_url'],
          })
        }),
      ),
    )
  }, [])

  const handleTransfer = () => {
    transfer([id])
  }

  return (
    <div className="nftWrapper">
      {cardData.url ? (
        <div
          className="nftImage"
          style={{
            background: `url(${cardData.url}) no-repeat center/100%`,
          }}
        />
      ) : (
        cardData.animationUrl && (
          <video width="400" autoPlay loop muted className="nftImage" src={cardData.animationUrl} />
        )
      )}

      <p className="nftName">{cardData.name}</p>
      <p className="transferNft" onClick={handleTransfer}>
        Transfer to project
      </p>
    </div>
  )
}
