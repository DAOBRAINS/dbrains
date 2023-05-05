import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Client,
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  GasFeeEstimation,
  ITokenVotingPluginInstall,
  TokenVotingClient,
  VotingMode,
} from "@aragon/sdk-client";
import { useAragonSDKContext } from "../context/AragonSDK";
import { NFTStorage, File, Blob, BlockstoreI } from "nft.storage";
import { useAccount, useProvider } from "wagmi";
export interface Inputs {
  projectName: string;
  projectDesc: string;
  ens: string;
  projectType: string;
  tokenType: string;
}

export default function CreateProject(inputs: Inputs) {
  const { context } = useAragonSDKContext();
  //wagmi signer? Not used in Aragon SDK, why??
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(
    `isConnecting = ${isConnecting}, isDisconnected = ${isDisconnected}, account address = ${address}`
  );

  async function createDAO({ projectName, projectDesc, ens }: Inputs) {
    // Instantiate the general purpose client from the Aragon OSx SDK context.
    const client: Client = new Client(context);
    //client Signer?
    const aragonsigner = await client.web3.getSigner().getAddress();
    console.log("client signer=", aragonsigner);
    //NFTSTORAGE (IPFS) client
    const NFTSTORAGEClient = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFTSTORAGE_IPFS_KEY as string,
    });
    //Factory address used
    const factoryAddress = client.web3.getDaoFactoryAddress();
    console.log(factoryAddress);

    const daoMetadata: DaoMetadata = {
      name: projectName,
      description: projectDesc,
      avatar: "image-url",
      links: [
        {
          name: ens + "dao.test",
          url: "https://...",
        },
      ],
    };

    // Through pinning the metadata in IPFS, we can get the IPFS URI. You can read more about it here: https://docs.ipfs.tech/how-to/pin-files/

    const blob = new Blob([JSON.stringify(daoMetadata, null, 2)], {
      type: "application/json",
    });

    const metadataUri = await NFTSTORAGEClient.storeBlob(blob);
    //const metadataUri = await client.methods.pinMetadata(daoMetadata);

    // You need at least one plugin in order to create a DAO. In this example, we'll use the TokenVoting plugin, but feel free to install whichever one best suites your needs. You can find resources on how to do this in the plugin sections.
    // These would be the plugin params if you need to mint a new token for the DAO to enable TokenVoting.
    const pluginInitParams: ITokenVotingPluginInstall = {
      votingSettings: {
        minDuration: 60 * 60 * 24 * 2, // seconds
        minParticipation: 0.25, // 25%
        supportThreshold: 0.5, // 50%
        minProposerVotingPower: BigInt("5000"), // default 0
        votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
      },
      newToken: {
        name: "DBRAIN PROJECT1 Token", // the name of your token
        symbol: "DBRP1", // the symbol for your token. shouldn't be more than 5 letters
        decimals: 18, // the number of decimals your token uses
        //minter: "0x...", // optional. if you don't define any, we'll use the standard OZ ERC20 contract. Otherwise, you can define your own token minter contract address.
        balances: [
          {
            // Defines the initial balances of the new token
            address: "0xE60930Dd528485BA57F4a17b02209877C2A9bFaC", // address of the account to receive the newly minted tokens
            balance: BigInt(10), // amount of tokens that address should receive
          },
        ],
      },
    };

    // Creates a TokenVoting plugin client with the parameteres defined above (with an existing token).
    const tokenVotingPluginToInstall =
      TokenVotingClient.encoding.getPluginInstallItem(pluginInitParams);

    const createDaoParams: CreateDaoParams = {
      metadataUri,
      ensSubdomain: "dbrains-project1", // my-org.dao.eth
      plugins: [tokenVotingPluginToInstall], // plugin array cannot be empty or the transaction will fail. you need at least one governance mechanism to create your DAO.
    };

    // Estimate how much gas the transaction will cost.
    /* const estimatedGas: GasFeeEstimation = await client.estimation.createDao(
      createDaoParams
    );
    console.log({ avg: estimatedGas.average, maximum: estimatedGas.max }); */

    // Create the DAO.
    const steps = client.methods.createDao(createDaoParams);
    console.log(steps);
    for await (const step of steps) {
      try {
        switch (step.key) {
          case DaoCreationSteps.CREATING:
            console.log(step.txHash);
            break;
          case DaoCreationSteps.DONE:
            console.log(step.address);
            break;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  const createProject = async (inputs: Inputs) => {
    await createDAO(inputs);
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-2xl text-gray-950 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        createProject(inputs);
      }}
    >
      {" "}
      <PlusIcon className="-mr-0.5 h-5 w-5  text-gray-950" aria-hidden="true" />
      Create a Project
    </button>
  );
}
