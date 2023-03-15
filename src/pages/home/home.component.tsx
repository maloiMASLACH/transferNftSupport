import './home.styles.css'

import { Button } from '@mui/material'
import { useInjection } from 'inversify-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { NftCard, SearchNftInput } from '@/components'
import { IContract } from '@/services'

export const HomeComponent: React.FC = () => {
  const { getNftsByUserAddress, transfer } = useInjection<IContract>(IContract.$)
  const [nftsId, setNftId] = useState<number[]>([])

  useEffect(() => {
    getNftsByUserAddress().then((nftIdArray) => nftIdArray && setNftId(nftIdArray))
  }, [])

  const handleTransferAll = () => {
    if (nftsId.length) {
      transfer(nftsId)
    } else {
      toast.error('No owned Nfts')
    }
  }

  return (
    <div className="homeWrapper">
      {!nftsId.length && (
        <>
          <h2>Your NFTs</h2>
          <div className="nftList">
            {[12, 13].map((id) => (
              <NftCard id={id} key={id} />
            ))}
          </div>
          <Button className="transferButton" variant="contained" onClick={handleTransferAll}>
            Transfer All
          </Button>
        </>
      )}

      <SearchNftInput />
    </div>
  )
}
