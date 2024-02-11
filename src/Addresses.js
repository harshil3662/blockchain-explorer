import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import './Transfer.css'
import './Addresses.css'

function Addresses() {
  const [addresses,setAddresses] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8080/account/addresses')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          setAddresses(responseData.list)
        })
        .catch((err) => {
          console.log(err)
        })
  },[addresses])

  return (
    <>
      <h2 style={{textAlign:'center'}}>Blockchain Node Addresses</h2>
      <div className='container'>
        {addresses.map((address,index)=>{
          return (
            <div>
              <Link className='address' to={`/transfer/${address}`}>{address}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Addresses