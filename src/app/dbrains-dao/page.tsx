//"use client";
//import { Metadata } from "next";
//import FetchDao from "../components/fetchDao";
//import FetchDaoDetailsASDK from "../components/fetchDaoDetailsASDK";
//import FetchMembers from "../components/fetchMembers";

/* export const metadata: Metadata = {
  title: "DBrains Main DAO | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
};
 */
/* export default function DBrainsDashboard() {
  return (
    <main className="mx-5">
      <h1 className="my-5 text-2xl">DBrains Platform&apos; s DAO</h1>
      <FetchDao />
    </main>
  );
} */
import { Client, DaoDetails } from "@aragon/sdk-client";
import { AragonSDKContext } from "../context/AragonSDK";

const client: Client = new Client(AragonSDKContext);

// Address or ENS of the DAO whose metadata you want to retrieve.
const daoAddressOrEns: string = "0x7a20D7FCE7d486c9cbe9da64BEbc1039E78c54ab"; // test.dao.eth

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

export default async function DBrainsDashboard() {
  const data = await getDetails();
  return (
    <div className="flex flex-col">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
