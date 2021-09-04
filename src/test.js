const Transaction = require("./transaction");
const Block = require("./block");
const Blockchain = require("./blockchain");
let s = new Blockchain();

// console.log("mining 1");

s.createTransaction(new Transaction("address1", "address2", 100));
s.createTransaction(new Transaction("address2", "address1", 50));

console.log("mining ");

s.minePendingTransactions("mining-reward-address");
console.log(s.getBalanceofAddress("mining-reward-address"));
// s.addBlock(new Block(2, "04/08/2021", { amount: 5 }));
// s.addBlock(new Block(3, "04/08/2021", { amount: 7 }));
// // console.log(JSON.stringify(s, null, 4));
// console.log(s.isChainValid());

console.log("mining ");

s.minePendingTransactions("mining-reward-address");
console.log(s.getBalanceofAddress("mining-reward-address"));
