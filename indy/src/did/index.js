'use strict';
const sdk = require('indy-sdk');
const indy = require('../../index.js');
let endpointDid;
let stewardDid,stewardVerkey, governmentWallet;
let issuerDid, issuerVerkey, communityServiceCenterWallet;
const dotenv = require("dotenv");
dotenv.config();

//초기 사용자 did 생성 (세부정보 입력 시 사용, 이후 vc 즉시 발급)
exports.createDid = async function (didInfoParam, walletName, walletKey) {
    //didInfo = seed
  let didInfo = { seed: didInfoParam } || {};
  try {
    await indy.did.settingGovernment();
    const proverWallet = await indy.wallet.get(walletName, walletKey)
    const [did, verkey] = await sdk.createAndStoreMyDid(proverWallet, didInfo);

    let didMeta = JSON.stringify({
      primary: true,
      schemas: [],
      credential_definitions: [],
    });
    await sdk.setDidMetadata(await indy.wallet.get(walletName, walletKey), did, didMeta);
    
    await indy.ledger.sendNym(await indy.pool.get(), governmentWallet, stewardDid, did, verkey, null)

    await indy.crypto.createMasterSecret(proverWallet)

    //ledger에 attrib을 등록해야할지 생각해야함
    return [did, verkey]
  } catch (e) {
    throw e;
  }
}

exports.settingGovernment = async function () {
  let stewardWalletName = 'governmentWallet'
  try {
    await sdk.createWallet({ id: stewardWalletName }, { key: process.env.GOVERNMENT_WALLET_KEY})
  } catch (e) {
    if (e.message !== 'WalletAlreadyExistsError') {
      console.warn('create wallet failed with message: ' + e.message);
      throw e;
    }
  } finally {
      console.info('wallet already exist, try to open wallet');
  }
  governmentWallet = await sdk.openWallet(
    {id: stewardWalletName},
    {key: process.env.GOVERNMENT_WALLET_KEY}
  );

  let governmentDidInfo = {
    'seed': process.env.MASTER_DID_SEED
  };
  
  [stewardDid, stewardVerkey] = await sdk.createAndStoreMyDid(governmentWallet, governmentDidInfo)

  return [stewardDid, stewardVerkey, governmentWallet]
}

exports.settingCommunityServices = async function () {
  try {
    await sdk.createWallet({ id: process.env.COMMUSERVEICECENTER_WALLET_NAME }, { key: process.env.COMMUSERVEICECENTER_WALLET_KEY})
  } catch (e) {
    if (e.message !== 'WalletAlreadyExistsError') {
      console.warn('create wallet failed with message: ' + e.message);
      throw e;
    }
  } finally {
      console.info('wallet already exist, try to open wallet');
  }

  communityServiceCenterWallet = await sdk.openWallet(
    {id: process.env.COMMUSERVEICECENTER_WALLET_NAME},
    {key: process.env.COMMUSERVEICECENTER_WALLET_KEY}
  );

  let commuServiceCenterDidInfo = {
    'seed': process.env.ISSUER_DID_SEED
  };

  [issuerDid, issuerVerkey] = await sdk.createAndStoreMyDid(communityServiceCenterWallet, commuServiceCenterDidInfo)

  return [issuerDid, issuerVerkey, communityServiceCenterWallet]
}


// 여기부터는 endpointDID 설정 함수
// 세부 입력 후 vc를 생성할 때 발급 기관과 사용자가 서로 의DID를 여러 함수에서 사용하기 때문에 endpointDID로 설정해놓고 필요할때마다 get함수를 이용해 사용

exports.getEndpointDid = async function (walletName, walletKey) {
  if (!endpointDid) {
    let dids = await sdk.listMyDidsWithMeta(await indy.wallet.get(walletName, walletKey));

    for (let didinfo of dids) {
      let meta = JSON.parse(didinfo.metadata);
      if (meta && meta.primary) {
        endpointDid = didinfo.did;
      }
    }
    if (!endpointDid) {
      await exports.createEndpointDid();
    }
  }
  return endpointDid;
};


exports.getDid = async function (walletName, walletKey) {
  let dids = await sdk.listMyDidsWithMeta(await indy.wallet.get(walletName, walletKey));
  for (let didinfo of dids) {
    let meta = JSON.parse(didinfo.metadata);
    if (meta && meta.primary) {
      endpointDid = didinfo.did;
    }
  } 
  return endpointDid;
}

exports.setEndpointDidAttribute = async function (walletName, walletKey, attribute, item) {
  let metadata = await sdk.getDidMetadata(await indy.wallet.get(walletName, walletKey), endpointDid);
  metadata = JSON.parse(metadata);
  metadata[attribute] = item;
  await sdk.setDidMetadata(
    await indy.wallet.get(),
    endpointDid,
    JSON.stringify(metadata)
  );
};
wallet =indy.wallet.get(walletName, walletKey)

exports.pushEndpointDidAttribute = async function (walletName, walletKey, attribute, item) {
  let metadata = await sdk.getDidMetadata(await indy.wallet.get(walletName, walletKey), indy.did.getDid(walletName,walletKey));
  metadata = JSON.parse(metadata);
  if (!metadata[attribute]) {
      metadata[attribute] = [];
  }
  metadata[attribute].push(item);
  await sdk.setDidMetadata(await indy.wallet.get(walletName, walletKey), indy.did.getDid(walletName, walletKey) , JSON.stringify(metadata));
};

exports.pushAttributeToWallet = async function (wallet, did, attribute, item) {
  let metadata = await sdk.getDidMetadata(wallet, did);
  metadata = JSON.parse(metadata);
  if (!metadata[attribute]) {
      metadata[attribute] = [];
  }
  metadata[attribute].push(item);
  await sdk.setDidMetadata(wallet, did , JSON.stringify(metadata));
};


exports.getEndpointDidAttribute = async function (wallet, attribute) {
  let metadata = await sdk.getDidMetadata(wallet, endpointDid);
  metadata = JSON.parse(metadata);
  return metadata[attribute];
};



// exports.createEndpointDid = async function () {
//   await settingGovernment();

//   [endpointDid, publicVerkey] = await sdk.createAndStoreMyDid(
//     await indy.wallet.get(),
//     {}
//   );
  
//   let didMeta = JSON.stringify({
//     primary: true,
//     schemas: [],
//     credential_definitions: [],
//   });
//   await sdk.setDidMetadata(await indy.wallet.get(), endpointDid, didMeta);

//   await indy.pool.sendNym(
//     await indy.pool.get(),
//     stewardWallet,
//     stewardDid,
//     endpointDid,
//     publicVerkey,
//     "TRUST_ANCHOR"
//   );
//   await indy.pool.setEndpointForDid(endpointDid, config.endpointDidEndpoint);
//   await indy.crypto.createMasterSecret();

//   // await issueGovernmentIdCredential();
// };





