"use client";
import { Rainbowkit } from "./components/rainbowkit";
import NavBar from "./components/navbar";
import DiscordInvite from "react-discord-invite";

export default function Home() {
  return (
    <Rainbowkit>
      <NavBar />
      <main>
        <h1 className="mt-5 text-2xl p-5">DBrains Home Page</h1>
        <p className="text-lg p-5">
          DBrains (for Decentalized Brains or DAO Brains) is a fully
          collaborative freelancing platform governed, self developed and
          self-founded by a DAO. The platform itself and the projects launched
          from the platform are developed by self organized collaborators
          forming DAOs. Central to the system is the monitoring of contribution
          to achieve fairness in retribution. A specific tokenomics based on NTT
          (non transferable tokens) allow the control of investments into the
          platform and a fair retribution for the builders. This project aims at
          harnessing the power of collective intelligence by allowing anybody to
          contribute and/or learn from his peers. This project aims at improving
          the efficiency of the labor market lowering the barrier of
          participation and developing tools to improve the efficiency of
          collaborative work, ultimately scaling the federation of collective
          intelligence and community governance to large communities.
        </p>
        <div className="p-5">
          <DiscordInvite guild="" />
        </div>
      </main>
    </Rainbowkit>
  );
}
