export const metadata = {
  title: "DBrains",
  description: "the fully collaborative freelancing plateforme",
};

export default function Home() {
  return (
    <main className="">
      <h1 className="mt-5 text-2xl p-5">DBrains Home</h1>
      <div className="relative mx-5 my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div>
            <p className="text-2xl p-5">Intro: </p>
            <p className="text-lg  p-5">
              DBrains (for Decentralized Brains or DAO Brains) is a fully
              collaborative freelancing platform governed, self developed and
              self-founded by a DAO. The platform itself and the projects
              launched from the platform are developed by self organized
              collaborators forming DAOs. Central to the system is the
              monitoring of contribution to achieve fairness in remuneration. A
              specific tokenomics based on NTT (non transferable tokens) allow
              the control of investments into the platform and a fair
              remuneration for the builders. This project aims at harnessing the
              power of collective intelligence by allowing anybody to contribute
              and/or learn from his peers. This project aims at improving the
              efficiency of the labor market lowering the barrier of
              participation and developing tools to improve the efficiency of
              collaborative work, ultimately scaling the federation of
              collective intelligence and community governance to large
              communities.
            </p>
          </div>
          <div>
            <p className="text-2xl p-5">Principles: </p>
            <ul className="text-2xl p-5">
              <li>
                <p className="text-lg">
                  {" "}
                  <span className="font-bold">Democracy: </span> the platform
                  and projects should be led by DAOs and decisions for the
                  development taken by the members by voting.
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
          </div>
        </div>
        <div
          className="flex flex-col text-xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
           from-blue-500 via-white to-red-700
            animate-text
            "
        >
          {" "}
          {/* from-indigo-500 via-purple-500 to-indigo-500 */}
          <div className="ml-10 p-5 text-2xl animate-textAnim">Objectives:</div>
          <div className="ml-10 p-3 text-xl animate-textAnim">
            Together, we can build this platform for all of us ...
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-4000">
            Federating / amplifying collective intelligence by improving the
            efficiency of collaborative working
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-8000">
            Empowering communities to self-organize, fulfilling the purpose of
            blockchain
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-12000">
            Solving the present inefficiency of the labour market
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-16000">
            Solving issues related to candidate selection and job seeking
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-20000">
            Striving for fair evaluation of contribution and remuneration,
            avoiding conflict of interests in traditional companies.
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-24000">
            Developing a tokenomic based on Non Transferable Token (NTT) to keep
            control of investments, avoiding speculation and protecting the
            value created by projects contributors.
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-28000">
            No need for initial investment, if we can find all competences among
            the people of the community.
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-32000">
            Sharing your experience and benefiting from the experience of
            others, avoiding re-inventing the wheel every time!
          </div>
          <div className="ml-10 p-3 animate-textAnim animation-delay-36000">
            If you have a car, you can work with Uber … if you have an
            apartment, you can work with Airbnb … if you have a brain, you can
            work with DBrains!
          </div>
        </div>
      </div>
    </main>
  );
}
