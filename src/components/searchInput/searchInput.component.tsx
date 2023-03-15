import './searchInput.styles.css'

import { Button, FormControl, TextField } from '@mui/material'
import { useInjection } from 'inversify-react'
import React, { useState } from 'react'

import { IContract } from '@/services'

export const SearchNftInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const { transfer } = useInjection<IContract>(IContract.$)

  const handleTransfer = () => {
    transfer([+inputValue])
  }

  return (
    <FormControl className="searchForm">
      <p className="searchTitle">You can transfer by id</p>
      <TextField
        color="info"
        value={inputValue}
        margin="dense"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained" onClick={handleTransfer}>
        Transfer
      </Button>
    </FormControl>
  )
}
