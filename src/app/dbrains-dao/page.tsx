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
import { TokenVotingClient, TokenVotingMember } from "@aragon/sdk-client";

const client: Client = new Client(AragonSDKContext);

// Address or ENS of the DAO whose metadata you want to retrieve.
const daoAddressOrEns: string = "0x5226d5316b131827325f6cf8ba65e1b246813a49";

async function getDetails() {
  // Get a DAO's details.
  const dao: DaoDetails | null = await client.methods.getDao(daoAddressOrEns);

  // Recommendation: handle errors
  /* if (!dao) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch dao details");
  } */
  console.log(dao);
  return dao;
}

async function getMembers() {
  // Create a TokenVoting client
  const tokenVotingClient: TokenVotingClient = new TokenVotingClient(
    AragonSDKContext
  );

  const pluginAddress: string = "0xe9409c6a6bff5fb83ea389e3688fc45491137e99"; //  The address of the plugin that DAO has installed. You can find this by calling `getDao(daoAddress)` and getting the DAO details .

  const members: TokenVotingMember[] =
    await tokenVotingClient.methods.getMembers(pluginAddress);
  console.log(members);
  return members;
}

export default async function DBrainsDashboard() {
  const data = await getDetails();
  const members = await getMembers();
  return (
    <div className="flex flex-col">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre className="p-5">
        DBrains Community Members:
        {members &&
          members!.map((member) => (
            <div>
              <p key={member.address}>{member.address}</p>
            </div>
          ))}
      </pre>
    </div>
  );
}
