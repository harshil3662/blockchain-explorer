const { Web3 } = require('web3')
const ganacheUrl = 'http://localhost:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);
var sender = ''

async function getAddresses(){
  const accounts = await web3.eth.getAccounts()
  sender = accounts[0]
  return accounts.slice(1,accounts.length)
}

async function getBalance(){
  const balanceWei = await web3.eth.getBalance(sender)
  const balance = web3.utils.fromWei(balanceWei, 'ether')

  return [sender,balance]
}

module.exports = [getAddresses,getBalance]