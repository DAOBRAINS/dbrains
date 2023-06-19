"use server";

import {
  Client,
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  GasFeeEstimation,
  VotingMode,
  votingSettingsToContract,
  ContractVotingSettings,
} from "@aragon/sdk-client";
import { useAragonSDKContext } from "../context/AragonSDK";
import { useAccount } from "wagmi";
import {
  EncodePluginInstallationProps,
  encodePluginInstallItem,
} from "@daobox/use-aragon";
import { Inputs } from "./projectModalSDK";

// Instantiate the general purpose client from the Aragon OSx SDK context.
const { context } = useAragonSDKContext();
const client: Client = new Client(context);

export async function createDbrainsDao(inputs: Inputs) {
  const daoMetadata: DaoMetadata = {
    name: inputs.projectName,
    description: inputs.projectDesc,
    links: [],
  };

  // Through pinning the metadata in IPFS, we can get the IPFS URI. You can read more about it here: https://docs.ipfs.tech/how-to/pin-files/
  const metadataUri = await client.methods.pinMetadata(daoMetadata);

  // You need at least one plugin in order to create a DAO. In this example, we'll use the TokenVoting plugin, but feel free to install whichever one best suites your needs. You can find resources on how to do this in the plugin sections.
  // These would be the plugin params if you need to mint a new token for the DAO to enable TokenVoting.
  /* const tokenVotingPluginInstallParams: TokenVotingPluginInstall = {
    votingSettings: {
      minDuration: 60 * 60 * 24 * 2, // seconds
      minParticipation: 0.25, // 25%
      supportThreshold: 0.5, // 50%
      minProposerVotingPower: BigInt("5000"), // default 0
      votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
    },
    newToken: {
      name: "Token", // the name of your token
      symbol: "TOK", // the symbol for your token. shouldn't be more than 5 letters
      decimals: 18, // the number of decimals your token uses
      minter: "0x...", // optional. if you don't define any, we'll use the standard OZ ERC20 contract. Otherwise, you can define your own token minter contract address.
      balances: [
        {
          // Defines the initial balances of the new token
          address: "0x2371238740123847102983471022", // address of the account to receive the newly minted tokens
          balance: BigInt(10), // amount of tokens that address should receive
        },
      ],
    },
  }; */

  // Creates a TokenVoting plugin client with the parameteres defined above (with an existing token).
  /* const tokenVotingInstallItem =
    TokenVotingClient.encoding.getPluginInstallItem(
      tokenVotingPluginInstallParams
    ); */

  //types of data provided to prepareInstallation (votingSetting, tokenSetting, mintSetting)
  //same as for tokenVotingPlugin without the token address since we will always create an NTToken
  const dataTypes = [
    "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
    "tuple(string name, string symbol) tokenSettings",
    "tuple(address[] receivers, uint256[] amounts) mintSettings",
  ];

  const pluginParameters = [
    Object.values(
      votingSettingsToContract({
        minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
        minParticipation: 0.25, // 25%
        supportThreshold: 0.5, // 50%
        minProposerVotingPower: BigInt("5000"), // default 0
        votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
      })
    ) as ContractVotingSettings,
    { name: "DBrains Token", symbol: "DBR" },
    { receivers: [useAccount().address], amounts: [BigInt("1")] },
  ];

  const encodedData: EncodePluginInstallationProps = {
    types: dataTypes,
    repoAddress: "0x74BebBdC74b454394A466444BC09Ab2A18666Df0",
    parameters: pluginParameters,
  };

  const plugin = encodePluginInstallItem(encodedData);

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
