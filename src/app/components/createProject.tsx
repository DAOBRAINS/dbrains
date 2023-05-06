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
import { useState } from "react";
import Modal from "./login";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function CreateProject() {
  const { context } = useAragonSDKContext();

  async function createDAO() {
    // Instantiate the general purpose client from the Aragon OSx SDK context.

    const client: Client = new Client(context);
    const clientNFTSTORAGE = new NFTStorage({
      token: process.env.NFTSTORAGE_IPFS_KEY as string,
    });

    const daoMetadata: DaoMetadata = {
      name: "DaoProject",
      description: "This project is about",
      avatar: "image-url",
      links: [
        {
          name: "Web site",
          url: "https://...",
        },
      ],
    };

    // Through pinning the metadata in IPFS, we can get the IPFS URI. You can read more about it here: https://docs.ipfs.tech/how-to/pin-files/

    const blob = new Blob([JSON.stringify(daoMetadata, null, 2)], {
      type: "application/json",
    });

    const metadataUri = await clientNFTSTORAGE.storeBlob(blob);
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
        name: "Token", // the name of your token
        symbol: "TOK", // the symbol for your token. shouldn't be more than 5 letters
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
      ensSubdomain: "my-org", // my-org.dao.eth
      plugins: [tokenVotingPluginToInstall], // plugin array cannot be empty or the transaction will fail. you need at least one governance mechanism to create your DAO.
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

  const [IsModalOpen, setIsModalOpen] = useState(false);
  //ghostshell

  const createProject = async () => {
    await createDAO();
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-xl text-gray-950 shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-[15rem]"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {" "}
        <PlusIcon
          className="-mr-0.5 h-5 w-5  text-gray-950"
          aria-hidden="true"
        />
        Create a Project
      </button>
      <Modal show={IsModalOpen}>
        <button
        className="rounded-full bg-gray-300 w-[2rem] h-[2rem] scale-[0.8]"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <XMarkIcon className="scale-[0.8]"/>
        </button>
        <p className="text-xl mb-4">Create Project</p>
        <div className="w-11/12 flex flex-col">
          <form className="flex flex-col" action="">
            <label>Project Name</label>
            <input
              type="text"
              name="p-name"
              placeholder="Project Name"
              required
              className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
            />
            <label>Project Description</label>
            <textarea
              cols={2}
              rows={3}
              placeholder="Project Description"
              required
              className="w-11/12 rounded-md border-blue-400 border-2 outline-blue-500 m-2 mx-0 mb-4 p-2"
            />
            <label>Project Picture</label>
            <input
              type="text"
              name="p-name"
              placeholder="Project Picture Link"
              required
              className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
            />
            <button className="bg-blue-400 rounded-md w-full p-2">
              Create
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
