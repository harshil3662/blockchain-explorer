import React from 'react'
import {useState,useEffect} from 'react'
import './Transfer.css'

function Wallet() {
  const [from,setFrom] = useState('')
  const [balance,setBalance] = useState(0)

  useEffect(()=>{
    fetch('http://localhost:8080/account/balance')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          setFrom(responseData.sender)
          setBalance(responseData.balance)
        })
        .catch((err) => {
          console.log(err)
        })
  },[from,balance])

  return (
    <div className='container'>
      <p><label>Wallet Address: </label>{from}</p>
      <p><label>Balance: </label>{balance}</p>
    </div>
  )
}

export default Wallet