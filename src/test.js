const Transaction = require("./transaction");
const Block = require("./block");
const Blockchain = require("./blockchain");
const sha256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const secp256k1 = new EC("secp256k1");

const myKey = secp256k1.keyFromPrivate(
  "aae43bf2e4aca56f052e1054bbcbf4c898945d064614075b3d4891560e8c5c4c"
);

const myWalletAddress = myKey.getPublic("hex");
// console.log("mining 1");

let s = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public_key_someone_else", 2);

tx1.signTransaction(myKey);

s.addTransaction(tx1);

s.minePendingTransactions(myWalletAddress);
console.log(s.getBalanceofAddress(myWalletAddress));

const tx2 = new Transaction(myWalletAddress, "public_key_someone_else", 3);

tx2.signTransaction(myKey);

s.addTransaction(tx2);

console.log("mining ");

s.minePendingTransactions(myWalletAddress);
console.log(s.getBalanceofAddress(myWalletAddress));

console.log(s.isChainValid());
// s.addBlock(new Block(2, "04/08/2021", { amount: 5 }));
// s.addBlock(new Block(3, "04/08/2021", { amount: 7 }));
// // console.log(JSON.stringify(s, null, 4));
// console.log(s.isChainValid());
