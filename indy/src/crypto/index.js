'use strict';
const sdk = require('indy-sdk');
const indy = require('../../index.js');
const uuid = require('uuid');

exports.createMasterSecret = async function (wallet) {
  let masterSecretId = await indy.did.getEndpointDidAttribute('master_secret_id');
  if(!masterSecretId) {
      masterSecretId = uuid();
      await sdk.proverCreateMasterSecret(wallet, masterSecretId);
      await indy.did.setEndpointDidAttribute('master_secret_id', masterSecretId);
  }

};

exports.getMasterSecretId = async function(wallet) {
  return await indy.did.getEndpointDidAttribute(wallet, 'master_secret_id');
}

//마스터 시크릿을 credOffer 이후에 만들어서 createCredReq에서 쓰고 proverCreateProof에서도 쓰기 때문에 did의 메타데이터에 저장한 후 사용해야 한다. 