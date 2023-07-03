"use server";

import {
  Client,
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  //GasFeeEstimation,
} from "@aragon/sdk-client";

import { IPluginInstallItem } from "@daobox/use-aragon";
import { Inputs } from "./projectModalSDK";
import { NFTStorage } from "nft.storage";
import { AragonSDKContext } from "../context/AragonSDK";
import { packToBlob } from "ipfs-car/pack/blob";
import { Wallet } from "ethers";

export async function createDbrainsDao(
  inputs: Inputs,
  plugin: IPluginInstallItem
) {
  /*  AragonSDKContext.set({
    signer: new Wallet(process.env.PRIVATE_KEY as string),
  }); */

  const client: Client = new Client(AragonSDKContext);
  const daoMetadata: DaoMetadata = {
    name: inputs.projectName,
    description: inputs.projectDesc,
    links: [
      {
        name: "dbrains website",
        url: "https://dbrains.vercel.app/",
      },
    ],
  };
  console.log(daoMetadata);
  const clientNFTSTORAGE = new NFTStorage({
    token: process.env.NFTSTORAGE_IPFS_KEY as string,
  });
  const blob = new Blob([JSON.stringify(daoMetadata, null, 2)], {
    type: "application/json",
  });

  /* const { root, car } = await packToBlob({
    input: blob,
    rawLeaves: false,
    wrapWithDirectory: false,
  });
  await clientNFTSTORAGE.storeCar(car);

  // downgrade the CID to v0
  const metadataUri = root.toV0().toString();
  console.log({ cid: metadataUri });
  // { cid: 'QmcLaoGJd1rAF1i7Q5Q4YknSuoC6eyFRFBaNXVRyANn1tA' } */

  const metadataCid = await clientNFTSTORAGE.storeBlob(blob);
  const metadataUri = "ipfs://" + metadataCid;
  console.log("metadataUri (createDbrainsDAO):", metadataUri);

  //const metadataUri = await client.methods.pinMetadata(daoMetadata);

  const createDaoParams: CreateDaoParams = {
    metadataUri,
    ensSubdomain: inputs.ens, //"dbrainstestdao", // my-org.dao.eth
    plugins: [plugin], // plugin array cannot be empty or the transaction will fail. you need at least one governance mechanism to create your DAO.
  };

  // Estimate how much gas the transaction will cost.
  /* const estimatedGas: GasFeeEstimation = await client.estimation.createDao(
    createDaoParams
  );
  console.log({ avg: estimatedGas.average, maximum: estimatedGas.max }); */

  // Create the DAO.
  const steps = client.methods.createDao(createDaoParams);

  for await (const step of steps) {
    try {
      switch (step.key) {
        case DaoCreationSteps.CREATING:
          console.log({ txHash: step.txHash });
          break;
        case DaoCreationSteps.DONE:
          console.log({
            daoAddress: step.address,
            pluginAddresses: step.pluginAddresses,
          });
          break;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
