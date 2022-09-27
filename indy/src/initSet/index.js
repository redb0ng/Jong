'use strict';
const sdk = require('indy-sdk');
const indy = require('../../index');
let poolHandle;
const dotenv = require('dotenv');

dotenv.config();


//정부, 주민센터 did 생성 및 did, wallet 셋업, 권한있는 did의 메타 데이터 설정, schema, credDef 생성 및 블록체인 등록
exports.setup = async function() {
  try { 
    poolHandle = await indy.pool.get()

    const [governmentDid, governmentKey, governmentWallet] = await indy.did.settingGovernment()

    const [commuServiceCenterDid, commuServiceCenterVerkey, commuServiceCenterWallet] = await indy.did.settingCommunityServices()

    let didMeta = JSON.stringify({
      primary: true,
      schemas: [],
      credential_definitions: [],
      revocation_registry: [],
    });
    await sdk.setDidMetadata(governmentWallet, governmentDid, didMeta);
    await sdk.setDidMetadata(commuServiceCenterWallet, commuServiceCenterDid, didMeta);


    let [idCertificateSchemaId, idCertificateSchema] = await sdk.issuerCreateSchema(governmentDid, 'Id-Certificate', '1.0',
      ['first_name', 'last_name', 'Identification_Number', 'address', 'age']);
    console.log(idCertificateSchemaId, idCertificateSchema)

    
    await indy.ledger.sendSchema(poolHandle, governmentWallet, governmentDid, idCertificateSchema);

    const govWalletName = process.env.GOVERNMENT_WALLET_NAME;
    const govWalletKey = process.env.GOVERNMENT_WALLET_KEY;

    // await indy.did.pushEndpointDidAttribute(govWalletName,govWalletKey, 'schemas', idCertificateSchemaId);
    await indy.did.pushAttributeToWallet(governmentWallet, governmentDid, 'schemas', idCertificateSchemaId);


    [idCertificateSchemaId ,idCertificateSchema] = await indy.ledger.getSchema(poolHandle, governmentDid, idCertificateSchemaId)




    // let issuerWalletName = process.env.COMMUSERVEICECENTER_WALLET_NAME;
    // let issuerWalletKey = process.env.COMMUSERVEICECENTER_WALLET_KEY;

    const [idCertCredDefId, idCertCredDef] = await sdk.issuerCreateAndStoreCredentialDef(commuServiceCenterWallet, commuServiceCenterDid, idCertificateSchema, 'e-IDCard', 'CL', { 'support_revocation': true })
    console.log(idCertificateSchemaId, idCertificateSchema)
    

    console.log(poolHandle, commuServiceCenterWallet, commuServiceCenterDid, idCertCredDef )

    await indy.ledger.sendCredDef(poolHandle, commuServiceCenterWallet, commuServiceCenterDid, idCertCredDef)

    const commuWalletName = process.env.COMMUSERVICECENTER_WALLET_NAME;
    const commuWalletKey = process.env.COMMUSERVEICECENTER_WALLET_KEY;
    // await indy.did.pushEndpointDidAttribute(commuWalletName, commuWalletKey, 'credential_definitions', idCertCredDefId)
    await indy.did.pushAttributeToWallet(commuServiceCenterWallet, commuServiceCenterDid, 'credential_definitions', idCertCredDefId)
    await sdk.closeWallet(governmentWallet);
    await sdk.closeWallet(commuServiceCenterWallet);
    //메타데이터 셋업 후 다시 steward를 셋업해도 메타데이터는 그대로 남아있다.
  } catch (err) {

  console.log(err);
  }
}



// exports.createCredDef = async function (schemaId, tag) {
//   let schema = await indy.ledger.getSchema(ph, did, schemaId);

//   await indy.did.getDid(walletName, walletKey)
  
//   let issuerWalletName = process.env.COMMUSERVEICECENTER_WALLET_NAME;
//   let issuerWalletKey = process.env.COMMUSERVEICECENTER_WALLET_KEY;

//   await sdk.listMyDidsWithMeta(indy.wallet.get(issuerWalletName, issuerWalletKey))
  
  
//   await sdk.issuerCreateAndStoreCredentialDef(await indy.wallet.get(issuerWalletName, issuerWalletKey), await indy.did.getDid() schema tag 'CL','{"support_revocation": true}')
// }

