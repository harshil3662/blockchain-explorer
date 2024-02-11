import './Transfer.css'

function Reciept({data}) {
  return (
    <div className='container'>
        <p><label>Transaction Hash: </label>{data.transactionHas}</p>
        <p><label>From: </label>{data.source}</p>
        <p><label>To: </label>{data.destination}</p>
        <p><label>Gas Fee: </label>{data.gasUsed}</p>
        <p><label>Value: </label>{data.amount} ETH</p>
        <p><label>Status: </label>{data.status}</p>
        <p><label>Created at: </label>{data.timestamp}</p>
    </div>
  )
}

export default Reciept