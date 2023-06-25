//import { createContext, useEffect, useContext, useState } from "react";

//import { useSigner } from "wagmi";
import { Context, ContextParams } from "@aragon/sdk-client";
//import { Wallet } from "ethers";

//create context not to be provided in global state:
let aragonSDKContextParams: ContextParams = {
  network: "maticmum", // mainnet, mumbai, etc
  //signer: Wallet.createRandom(),
  daoFactoryAddress: "0x3ff1681f31f68Ff2723d25Cf839bA7500FE5d218", //"0x16B6c6674fEf5d29C9a49EA68A19944f5a8471D3", // the DAO Factory contract address from the Goerli network. You can find the daoFactoryAddress you need from the active_contracts file within the osx repository here: https://github.com/aragon/osx/blob/develop/active_contracts.json
  web3Providers: [
    `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_KEY}`,
  ], //["https://rpc.ankr.com/eth_goerli"], // feel free to use the provider of your choosing: Alchemy, Infura, etc.
  ipfsNodes: [
    {
      url: "https://testing-ipfs-0.aragon.network/api/v0", //"https://ipfs.infura.io:5001",
      headers: {
        "X-API-KEY": process.env.ARAGON_IPFS_KEY || "",
      }, // make sure you have the key for your IPFS node within your .env file
    },
  ],
  graphqlNodes: [
    {
      url: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/api", //?? // this will change based on the chain you're using (osx-mainnet alternatively)
    },
  ],
};

// After defining the context parameters, you'll use them to instantiate the Aragon SDK context
export const AragonSDKContext: Context = new Context(aragonSDKContextParams);

//Update the context with new parameters if you wish to throughout your app.
/* context.set({ network: 1 });
context.set({ signer: new Wallet("private key") }); // if you're using wagmi library, you can also get the signer through their [`useSigner` method](https://wagmi.sh/react/hooks/useSigner) inside a `useEffect` hook.
context.set(contextParams); */

//context Global Provider

/* const AragonSDKContext = createContext({});

export function AragonSDKWrapper({ children }: any) {
  const [context, setContext] = useState<Context | undefined>(undefined);
  const signer = useSigner().data;

  useEffect(() => {
    let aragonSDKContextParams: ContextParams = {
      network: "maticmum", // mainnet, mumbai, etc
      //signer: Wallet.createRandom(),
      daoFactoryAddress: "0x3ff1681f31f68Ff2723d25Cf839bA7500FE5d218", //"0x16B6c6674fEf5d29C9a49EA68A19944f5a8471D3", // the DAO Factory contract address from the Goerli network. You can find the daoFactoryAddress you need from the active_contracts file within the osx repository here: https://github.com/aragon/osx/blob/develop/active_contracts.json
      //web3Providers: ["https://polygon-mumbai.g.alchemy.com/v2/"], //["https://rpc.ankr.com/eth_goerli"], // feel free to use the provider of your choosing: Alchemy, Infura, etc.
      ipfsNodes: [
        {
          url: "https://ipfs.infura.io:5001", //"https://testing-ipfs-0.aragon.network/api/v0",
          headers: {
            "X-API-KEY": process.env.INFURA_IPFS_KEY || "",
          }, // make sure you have the key for your IPFS node within your .env file
        },
      ],
      graphqlNodes: [
        {
          url: "https://subgraph.satsuma-prod.com/aragon/osx-mumbai/api", //?? // this will change based on the chain you're using (osx-mainnet alternatively)
        },
      ],
    };

    console.log("signer in AragonSDK useEffect", signer);
    setContext(new Context(aragonSDKContextParams));
    console.log("context in AragonSDK useEffect", context);
  }, [signer]);

  return (
    <AragonSDKContext.Provider value={{ context }}>
      {children}
    </AragonSDKContext.Provider>
  );
}

export function useAragonSDKContext(): any {
  return useContext(AragonSDKContext);
}
 */
