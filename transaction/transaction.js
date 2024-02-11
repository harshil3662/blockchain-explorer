const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Transactions')
const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
 })
 
db.once('connected', () => {
    console.log('Database Connected')
})

const { Web3 } = require('web3')
const Transaction = require('./database')
const ganacheUrl = 'http://localhost:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

async function sendTransaction(source,destination,amount){
    const transactionReceipt = await web3.eth.sendTransaction({
        from: source,
        to: destination,
        value: web3.utils.toWei(amount, 'ether'),
    })

    const receipt = {
        source: transactionReceipt.from,
        destination: transactionReceipt.to,
        amount: amount,
        status: 'Success',
        transactionHas: transactionReceipt.transactionHash.toString(),
        gasUsed: transactionReceipt.gasUsed.toString(),
        timestamp: new Date().toISOString()
    }

    if(transactionReceipt.status){
        try {
            const newTran = new Transaction(receipt)
            await newTran.save()
            console.log('Transaction saved successfully.')
        } catch (error) {
            console.log('Error saving the user',error)
        }
    }
    console.log(receipt)

    return receipt
}

async function getTransactions(){
    const history = await Transaction.find()
    return history
}

module.exports = [getTransactions,sendTransaction]