const sha256 = require("crypto-js/sha256");

//each block includes a block header and a block body
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.previousHash = previousHash; //hash of previous block to ensure integrity
    this.hash = this.calculateHash(); //current block hash based on data
    this.timestamp = timestamp;
    this.transactions = transactions;
    // this.difficulty = difficulty;
    this.nonce = 0; // used to find the hidden hash that signed the block
    // this.transactionListHash;
  }

  //block header is a sha526 hash of the previous block
  //blake 3 root hash of transaction list
  //difficulty target for this block
  //nonce used to mine this block

  //block body is the list of transactions used to generate blake 3 root hash

  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    //hash of block beginning with 0s
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("block mined: " + this.hash);
  }

  hasValidTransactions() {
    //iterate over all transactions in the block
    for (const trans of this.transactions) {
      if (!trans.isTransactionValid()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Block;
