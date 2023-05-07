"use client";
//import { Metadata } from "next";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import FetchDao from "../components/fetchDao";

/* export const metadata: Metadata = {
  title: "DBrains Main DAO | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
};
 */
export default function DBrainsDashboard() {
  return (
    <main className="mx-5">
      <h1 className="my-5 text-2xl">DBrains Platform&apos; DAO</h1>
      <FetchDao />
    </main>
  );
}
