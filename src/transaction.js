class Transaction {
  constructor() {
    //UTXO transaction model
    //each transaction includes a header and a body
    //header containds a transaction ID which is blake3 hash of transaction body
    this.transactionID = this.getTranscationBodyHash();
  }

  getTranscationBodyHash() {
    return sha256.hmac(sha256.hmac(this.input, this.outputs), this.signature);
  }
}

module.exports = Transaction;
