var sha256 = require("js-sha256");
//each block includes a block header and a block body
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; //which block is it in the chain
    this.previousHash = previousHash; //hash of previous block to ensure integrity
    this.hash = this.calculateHash(); //current block hash based on data
    this.timestamp = timestamp;
    this.data = data;
    // this.difficulty = difficulty;
    this.nonce = 0; // used to find the hidden hash that signed the block
    // this.transactionListHash;
  }

  //block header is a sha526 hash of the previous block
  //blake 3 root hash of transaction list
  //difficulty target for this block
  //nonce used to mine this block

  //block body is rhw lost of transactions used to generate blake 3 root hash

  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
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
}

module.exports = Block;
