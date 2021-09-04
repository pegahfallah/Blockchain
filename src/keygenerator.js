const EC = require("elliptic").ec;
const secp256k1 = new EC("secp256k1");

//signing and verifying
const key = secp256k1.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log("private" + privateKey);
console.log(publicKey);
