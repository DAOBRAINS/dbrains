import { Client, DaoDetails } from "@aragon/sdk-client";
import { AragonSDKContext } from "../context/AragonSDK";

const client: Client = new Client(AragonSDKContext);

// Address or ENS of the DAO whose metadata you want to retrieve.
const daoAddressOrEns: string = "0xD30E4c57faA705cd190D24fFb6183D19Af338806"; // test.dao.eth

async function getDetails() {
  // Get a DAO's details.
  const dao: DaoDetails | null = await client.methods.getDao(daoAddressOrEns);

  // Recommendation: handle errors
  if (!dao) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch dao details");
  }
  console.log(dao);
  return dao;
}

export default async function FetDaoDetailsASDK() {
  const data = await getDetails();
  return (
    <div className="flex flex-col">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
