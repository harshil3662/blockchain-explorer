import {useState,useEffect} from 'react'
import Reciept from './Reciept'
import { useParams } from 'react-router-dom'
import './Transfer.css'

function Transfer() {
    const [from,setFrom] = useState('')
    const [balance,setBalance] = useState(0)
    const to = useParams().nodeAddress
    const [isSubmited,setSubmit] = useState(false)
    const [amount,setAmount] = useState(0)
    const [data,setData] = useState({})

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

    const increaseAmount = () => {
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        if(amount === 0){
            return
        }
        setAmount(amount - 1)
    }

    const handleSubmit = async (e) => {
        if(amount <= balance){
            e.preventDefault()
            fetch('http://localhost:8080/transaction/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    source: from,
                    destination: to,
                    value: amount
                })
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then((responseData) => {
              setData(responseData.receipt)
              setSubmit(true)
            })
            .catch((err) => {
              console.log(err)
            })
        }else{
            window.alert("Oppps!!! Insufficient balance.")
        }
    }

    return (
        <>
            <div className='container'>
                <h2>Transfer</h2>
                <p><label>From: </label>{from}</p>
                <p><label>To: </label>{to}</p>
                <form onSubmit={handleSubmit}>
                    <label>Amount: </label>
                    <button id='down' type='button' onClick={decreaseAmount}> - </button>
                    <input
                        type="number"
                        min={0}
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button id='up' type='button' onClick={increaseAmount}> + </button>
                    <button className='submit' type='submit'> Submit </button>
                </form>
            </div>
            {isSubmited && 
                <div>
                    <h2>Reciept</h2>
                    <Reciept data={data}/>
                </div>
            }
        </>
    )
}

export default Transfer