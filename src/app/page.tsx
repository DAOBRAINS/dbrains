"use client";

import { useEffect, useState } from "react";

/* export const metadata = {
  title: "DBrains",
  description: "the fully collaborative freelancing plateforme",
}; */

export default function Home() {
  const messages = [
    "Together, we can build this platform for all of us ...",
    "Federating / amplifying collective intelligence by improving the efficiency of collaborative working",
    "Empowering communities to self-organize, fulfilling the purpose of blockchain",
    "Solving the present inefficiency of the labour market",
    "Solving issues related to candidate selection and job seeking",
    "Striving for fair evaluation of contribution and remuneration, avoiding conflict of interests in traditional companies.",
    "Developing a tokenomic based on Non Transferable Token (NTT) to keep control of investments, avoiding speculation and protecting the value created by projects contributors.",
    "No need for initial investment, if we can find all competences among the people of the community.",
    "Sharing your experience and benefiting from the experience of others, avoiding re-inventing the wheel every time!",
    "If you have a car, you can work with Uber … if you have an apartment, you can work with Airbnb … if you have a brain, you can work with DBrains!",
  ];

  const [count, setCount] = useState(1);

  useEffect(
    function () {
      const interval = setInterval(function () {
        setCount(count + 1);
      }, 5000);

      return function () {
        clearTimeout(interval);
      };
    },
    [count]
  );

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

        {/*  from-blue-500 via-white to-red-700
         from-white via-orange-600 to-indigo-500 */}
        <div
          className="flex text-center self-center text-4xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-white via-orange-600 to-white
            animate-text"
        >
          <p>{messages[count % 10]}</p>
        </div>
      </div>
    </main>
  );
}
