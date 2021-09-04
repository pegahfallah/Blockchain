const sha256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const secp256k1 = new EC("secp256k1");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    //UTXO transaction model
    //each transaction includes a header and a body
    //header containds a transaction ID which is blake3 hash of transaction body
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    // this.transactionID = this.getTranscationBodyHash();
  }

  calculateHash() {
    return sha256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  /**
   *
   * @param {*} signingKey recieved from private and public key pair
   */
  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("cannot sign transaction for other wallets");
    }
    const transactionHash = this.calculateHash();
    const signature = signingKey.sign(transactionHash, "base64");
    this.signature = signature.toDER("hex");
  }
  /**
   *
   */
  isTransactionValid() {
    if (this.fromAddress === null) return true;
    if (!this.signature || !this.signature.length === 0) {
      throw new Error("no signature in this transaction");
    }
    //from address is a public key
    const publicKey = secp256k1.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature); //the hash of this block has been signed by the signature
  }
}

module.exports = Transaction;
