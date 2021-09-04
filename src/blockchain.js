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
    const rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    console.log("mined successfully");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    //check that from and to address are filled in
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("transaction must include from and to address");
    }
    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be higher than 0");
    }

    if (!transaction.isTransactionValid()) {
      throw new Error("transaction not valid cannot add to chain");
    }
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

  getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }

    return txs;
  }

  /**
   *
   * @returns false if a block is tampered with
   */
  isChainValid() {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
module.exports = Blockchain;
