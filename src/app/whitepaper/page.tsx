import { Metadata } from "next";
import Image from "next/image";

/* export const metadata: Metadata = {
  title: "Projects Dashboard | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
}; */

export default function Whitepaper() {
  return (
    <main className="mx-5 my-5">
      <div>
        {" "}
        <main className="max-w-xl">
          <h1 className="mt-5 text-2xl p-5">DBrains Whitepaper</h1>
          <p className="text-2xl p-5">Intro </p>
          <p className="text-lg p-5">
            DBrains (for Decentralized Brains or DAO Brains) is a fully
            collaborative freelancing platform governed, self developed and
            self-founded by a DAO. The platform itself and the projects launched
            from the platform are developed by self organized collaborators
            forming DAOs. Central to the system is the monitoring of
            contribution to achieve fairness in remuneration. A specific
            tokenomics based on NTT (non transferable tokens) allow the control
            of investments into the platform and a fair remuneration for the
            builders. This project aims at harnessing the power of collective
            intelligence by allowing anybody to contribute and/or learn from his
            peers. This project aims at improving the efficiency of the labor
            market lowering the barrier of participation and developing tools to
            improve the efficiency of collaborative work, ultimately scaling the
            federation of collective intelligence and community governance to
            large communities.
          </p>
          <br />
          <p className="text-2xl p-5">Principles: </p>
          <ul className="text-2xl p-5">
            <li>
              <p className="text-lg">
                {" "}
                <span className="font-bold">Democracy: </span> the platform and
                projects should be led by DAOs and decisions for the development
                taken by the members by voting.
              </p>
              <br />
            </li>{" "}
            <li>
              <p className="text-lg ">
                <span className="font-bold">Fairness: </span> the platform
                should strive to achieve a fair remuneration of participants
                according to their contribution
              </p>
              <br />
            </li>{" "}
            <li>
              <p className="text-lg ">
                <span className="font-bold">Openness: </span> the platform
                should strive to allow anyone to join projects and contribute
              </p>
            </li>{" "}
          </ul>
          <p className="text-2xl p-5">How does it work? </p>{" "}
          <p className="text-lg p-5">
            Members can propose new projects which are listed in the projects
            board. There can be many sort of projects, like &quot;paid
            projects&quot; for which the projects launchers lock payments in
            escrow which can be distributed to contributors at the fulfillment
            of the project. There can also be &quot;free projects&quot; whose
            members gather together around the development of some ideas. Some
            projects are open to everyone, some projects may wish to select who
            is onboarded. The members of the projects self-organize to propose
            developments paths. Decisions are taken democratically. Members
            determine together how to split the development into tasks and
            assign them, and basically design together the entire project. The
            rewards for the fulfillment of tasks are also determined and
            validated by the DAOs. The monitoring/evaluation of members
            contributions will be initially mainly performed by DAOs, but could
            be later combined with the monitoring/evaluation by some AI
            algorithms. So that people can be guaranteed to be fairly
            remunerated for their ideas and hard working. Tools like feature.sh
            for the setup of bounties, or Sourcecred.io for the monitoring of
            contribution could be integrated into the platform for this purpose.
          </p>
          <Image
            className=" p-5 block  max-w-max"
            src="/dbrains_functioning2.png"
            width={1300}
            height={1300}
            alt="DBrains functioning"
          />
          <p className="text-2xl p-5">Platform Tokenomics:</p>{" "}
          <p className="text-lg p-5">
            The DBR token associated with the main DAO&apos;s platform is a Non
            Transferable Token (NTT). Members who do contribute to the platform
            development receive DBR tokens if their contribution is validated by
            the DAO. DBR tokens are somewhat equivalent to equity in traditional
            companies, they are bound to the contributors who earned them. They
            cannot be transferred. When the project is coming to maturity and
            generate money, contributors will receive dividends depending on
            their earned DBRs. The DAO can decide to open to investors, who can
            purchase DBRs in exchange of currencies at a rate determined by the
            DAO. The currencies are deposited into the DAO treasury which can
            decide to use it for different purposes. Investors are then part of
            the DAO like others contributors owners of DBRs. DAO members can use
            the treasury for hiring external services or for providing
            remuneration to the members, who can decide to burn some of their
            DBRs in exchange of some payments in available currencies. This
            system will avoid speculation typical to web3 project and reward
            contributors fairly. Thus the platform will self developed without
            the need for initial investment. Projects developed through the
            platform can be similarly associated with NTT tokens and
            funding/remuneration managed along the same lines. But Projects
            launchers are free to decide the type of tokenomics they want for
            their project. Projects launchers will pay some fee to the DBrains
            DAO for using the Platform.
          </p>
        </main>
      </div>
    </main>
  );
}
