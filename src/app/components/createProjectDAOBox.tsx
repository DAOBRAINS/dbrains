import { PlusIcon } from "@heroicons/react/24/outline";
import { NFTStorage, File, Blob, BlockstoreI } from "nft.storage";
import { useAccount } from "wagmi";
import { IPluginInstallItem, useNewDao } from "@daobox/use-aragon";

export default function CreateProject() {
  //wagmi signer? Not used in Aragon SDK, why??
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(
    `isConnecting = ${isConnecting}, isDisconnected = ${isDisconnected}, account address = ${address}`
  );

  async function createDAO() {
    /* const installData: IPluginInstallItem = useGenerateInstallData({
        pluginAddress: '0xPluginAddress',
        pluginInitParams: { ... },
      })
    
      const { mutate, creationStatus, daoAddress, daoTxHash } = useNewDao({
        daoMetadata: { name: 'My DAO', description: 'A great DAO' },
        daoUri: 'https://my-dao.example.com',
        ensSubdomain: 'mydao',
        trustedForwarder: '0x1234...',
        plugins: [installData],
      }) */
  }

  const createProject = async () => {
    await createDAO();
  };

  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-2xl text-gray-950 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        createProject();
      }}
    >
      {" "}
      <PlusIcon className="-mr-0.5 h-5 w-5  text-gray-950" aria-hidden="true" />
      Create a Project
    </button>
  );
}
