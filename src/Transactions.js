import Reciept from './Reciept'
import {useState,useEffect} from 'react'

function Transactions() {
  const [transactions,setTransactions] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8080/transaction/history')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          setTransactions(responseData.list)
        })
        .catch((err) => {
          console.log(err)
        })
},[transactions])
  
  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length > 0 ? 
        transactions.map((t,i)=>{
          return (
            <div key={i}>
              <Reciept data={t}/>
            </div>
          )
        }): 
          <h5>No Transactions so far...</h5>
        }
    </div>
  )
}

export default Transactions