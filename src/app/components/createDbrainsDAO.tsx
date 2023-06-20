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

export async function createDbrainsDao(
  client: Client,
  inputs: Inputs,
  plugin: IPluginInstallItem
) {
  const daoMetadata: DaoMetadata = {
    name: inputs.projectName,
    description: inputs.projectDesc,
    links: [],
  };

  // Through pinning the metadata in IPFS, we can get the IPFS URI. You can read more about it here: https://docs.ipfs.tech/how-to/pin-files/
  const metadataUri = await client.methods.pinMetadata(daoMetadata);

  const createDaoParams: CreateDaoParams = {
    metadataUri,
    ensSubdomain: inputs.ens, //"dbrainstestdao", // my-org.dao.eth
    plugins: [plugin], // plugin array cannot be empty or the transaction will fail. you need at least one governance mechanism to create your DAO.
  };

  // Estimate how much gas the transaction will cost.
  const estimatedGas: GasFeeEstimation = await client.estimation.createDao(
    createDaoParams
  );
  console.log({ avg: estimatedGas.average, maximum: estimatedGas.max });

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
