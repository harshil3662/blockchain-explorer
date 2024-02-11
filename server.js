const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const [getAddresses,getBalance] = require('./accounts/accounts')
const [getTransactions,sendTransaction] = require('./transaction/transaction')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/account/addresses',async (req,res)=>{
    const data = await getAddresses()
    const addresses = {list:data}
    res.json(addresses)
})

app.get('/account/balance',async (req,res)=>{
    const [sender,balance] = await getBalance()
    const account = {
        sender : sender,
        balance: balance
    }
    res.json(account)
})

app.get('/transaction/history',async (req,res)=>{
    const transactions = await getTransactions()
    const data = { list:transactions}
    res.json(data)
})

app.post('/transaction/send',async (req,res)=>{
    const source = req.body.source
    const destination = req.body.destination
    const value = req.body.value

    const receipt = await sendTransaction(source,destination,value)
    const data = {receipt: receipt}
    res.json(data)
})

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log("server is running on 8080")
})