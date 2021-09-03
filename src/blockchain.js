const Block = require("./block.js");
const Transaction = require("./transaction.js");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  /**
   * initialize the blockchain with the genesis block statically
   *
   * @returns {Block}
   */
  createGenesisBlock() {
    //index = 0, date is static, empty data, previous hash is 0
    return new Block("03/08/2021", [], "0000000");
  }

  /**
   * Returns the latest block on our chain.
   * @returns {Block[]}
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   *
   * @param {*} newBlock
   *
   * adds a new block to the blockchain
   */

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   //validate first
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }

  //in reality miners pick transactions
  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    console.log("block mined");
    block.mineBlock(this.difficulty);
    this.chain.push(block);

    //create a new transaction to give miner reward
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  //transaction stored on the blockchain and calculated by going through blockchain

  /**
   *
   * @param {*} address
   * @returns balance
   */
  getBalanceofAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }
  /**
   *
   * @returns false if a block is tampered with
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      //check if linked together properly
      if (currBlock.hash !== currBlock.calculateHash()) {
        return false;
      }
      if (currBlock.previousHash !== prevBlock.hash) {
        console.log("here");
        console.log(currBlock.previousHash);
        console.log(prevBlock.hash);
        return false;
      }
      //   if (currBlock.previousHash != prevBlock.nonce) {
      //     return false;
      //   }
      return true;
    }
  }
}

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

module.exports = Blockchain;
