"use server";

import {
  Client,
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  GasFeeEstimation,
} from "@aragon/sdk-client";

import { IPluginInstallItem } from "@daobox/use-aragon";
import { Inputs } from "./projectModalSDK";
import { NFTStorage } from "nft.storage";
import { AragonSDKContext } from "../context/AragonSDK";
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
    links: [],
  };
  console.log(daoMetadata);
  /* const clientNFTSTORAGE = new NFTStorage({
    token: process.env.NFTSTORAGE_IPFS_KEY as string,
  });
  const blob = new Blob([JSON.stringify(daoMetadata, null, 2)], {
    type: "application/json",
  });
  const metadataUri = await clientNFTSTORAGE.storeBlob(blob);
  console.log("metadataUri (createDbrainsDAO):", metadataUri); */

  // Through pinning the metadata in IPFS, we can get the IPFS URI. You can read more about it here: https://docs.ipfs.tech/how-to/pin-files/
  const metadataUri = await client.methods.pinMetadata(daoMetadata);

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
