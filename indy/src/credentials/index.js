'use strict';
const sdk = require('indy-sdk');
const indy = require('../../index');
const utils = require('../utils');
const dotenv =require('dotenv');
dotenv.config();


exports.sendCredOffer = async function (walletName, walletKey, credentialData) {
  const commuWalletName = process.env.COMMUSERVEICECENTER_WALLET_NAME;
  const commuWalletKey = process.env.COMMUSERVEICECENTER_WALLET_KEY;

  const credDefId = await indy.did.getEndpointDidAttribute(commuWalletName, commuWalletKey, 'credential_definitions')
  let credOffer = await sdk.issuerCreateCredentialOffer(await indy.wallet.get(walletName, walletKey), credDefId);
  return credOffer;
}

exports.sendCreateCredReq = async function (walletName, walletKey, theirDid, credOffer) {
  let proverWallet = await indy.wallet.get(walletName, walletKey)
  let [, credDef] = await indy.ledger.getCredDef(await indy.pool.get(), credOffer.cred_def_id)
  let masterSecretId = await indy.crypto.createMasterSecret(proverWallet)

  let credReq = await sdk.proverCreateCredentialReq(proverWallet, credOffer, credDef, masterSecretId)
  return credReq
}





exports.encode = function(string) {
  console.log(string);
  if(!string) {
      return string;
  }
  let newString = Buffer.from(string.toString(),'utf8').toString();
  let number = "1";
  let length = newString.length;
  for (let i = 0; i < length; i++) {
      let codeValue = newString.charCodeAt(i).toString(10);
      if(codeValue.length < 3) {
          codeValue = "0" + codeValue;
      }
      number += codeValue;
  }
  console.log(number);
  return number;
};

exports.decode = function(number) {
  console.log(number);
  if(!number) return number;
  let string = "";
  number = number.slice(1); // remove leading 1
  let length = number.length;

  for (let i = 0; i < length;) {
      let code = number.slice(i, i += 3);
      string += String.fromCharCode(parseInt(code, 10));
  }
  console.log(string);
  return string;
};