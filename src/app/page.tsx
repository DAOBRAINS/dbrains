export const metadata = {
  title: "DBrains",
  description: "the fully collaborative freelancing plateforme",
};

export default function Home() {
  return (
    <div>
      {" "}
      <main>
        <h1 className="mt-5 text-2xl p-5">DBrains Home Page</h1>
        <p className="text-lg p-5 max-w-xl">
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
        <br />
        <p className="text-2xl p-5">Principles: </p>
        <ul className="text-2xl p-5 max-w-xl">
          <li>
            <p className="text-lg max-w-xl">
              {" "}
              <span className="font-bold">Democracy: </span> the platform and
              projects should be developed by DAOs and decisions for the
              development taken by the members by voting.
            </p>
            <br />
          </li>{" "}
          <li>
            <p className="text-lg max-w-xl">
              <span className="font-bold">Fairness: </span> the platform should
              strive to achieve a fair retribution of participants according to
              their contribution
            </p>
            <br />
          </li>{" "}
          <li>
            <p className="text-lg max-w-xl">
              <span className="font-bold">Openness: </span> the platform should
              strive to allow anyone to join projects and contribute
            </p>
          </li>{" "}
        </ul>
      </main>
    </div>
  );
}
