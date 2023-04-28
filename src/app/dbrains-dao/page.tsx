import { Metadata } from "next";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";

export const metadata: Metadata = {
  title: "DBrains DAO | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
};

export default function DBrainsDashboard() {
  return (
    <main className="mx-5">
      <h1 className="my-5 text-2xl">DBrains DAO</h1>
    </main>
  );
}
