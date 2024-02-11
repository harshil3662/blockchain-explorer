const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    source : String,
    destination : String,
    amount: String,
    status : String,
    gasUsed : String,
    transactionHash : String,
    timestamp : String
})

const Transaction = mongoose.model('Transactions',transactionSchema)

module.exports = Transaction