import { PlusIcon } from "@heroicons/react/24/outline";
import { useNewDao } from "@daobox/use-aragon";
import { useProvider } from "wagmi";

import FetchDaoTest from "./fetchDaoTest";
import {
  DaoMetadata,
  ITokenVotingPluginInstall,
  TokenVotingClient,
  VotingMode,
} from "@aragon/sdk-client";

export default function CreateDaoBox() {
  const daoMetadata: DaoMetadata = {
    name: "DaoProject1",
    description: "This project is about developing a project using a Dao",
    avatar: "image-url",
    links: [
      {
        name: "Web site",
        url: "https://...",
      },
    ],
  };

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

  const provider = useProvider();
  const exist = provider.getCode("0x16B6c6674fEf5d29C9a49EA68A19944f5a8471D3");
  console.log("contract dao factory exists?:", exist);

  // Creates a TokenVoting plugin client with the parameteres defined above (with an existing token).
  const tokenVotingPluginToInstall =
    TokenVotingClient.encoding.getPluginInstallItem(pluginInitParams);

  const { mutate, creationStatus, daoAddress, daoTxHash } = useNewDao({
    daoMetadata,
    //daoUri: "https://project1.dbrains.com",
    ensSubdomain: "dbrains-projectfkmsdlfkmqjg",
    //trustedForwarder: "0xE60930Dd528485BA57F4a17b02209877C2A9bFaC",
    plugins: [tokenVotingPluginToInstall],
  });

  return (
    <>
      <button
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-2xl text-gray-950 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => mutate?.()}
      >
        "Create DAO using use-aragon"
      </button>
      <p>{creationStatus}</p>
      <p>{daoAddress}</p>
      <p>{daoTxHash}</p>
    </>
  );
}
