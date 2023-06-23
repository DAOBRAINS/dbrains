"use client";

import React, { useEffect, useState } from "react";

export default function Slogans() {
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
      }, 7000);

      return function () {
        clearTimeout(interval);
      };
    },
    [count]
  );

  return (
    <div>
      <div
        className=" order-first sm:order-last flex text-center self-center text-4xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-white via-orange-600 to-white
            animate-text"
      >
        <p>{messages[count % 10]}</p>
      </div>
    </div>
  );
}
