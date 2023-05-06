"use client";

import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import CreateProject from "../components/createProject";

/* export const metadata: Metadata = {
  title: "Projects Dashboard | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
}; */

export default function ProjectsDashboard() {
  const projects = [
    {
      id: 1,
      name: "Vernithon project",
      desc: "create an art gallery crawl app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
      username: "ghostshell",
      number: 123,
      date: "12/12/2012"
    },
  ];
  return (
    <main className="mx-5 my-5 flex flex-col">
      <CreateProject/>

      <h1 className="my-5 text-2xl px-4 font-bold">Join a Project</h1>

      <div className="w-full mt-4 flex m-4 flex-wrap justify-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-md bg-white px-6 py-4 shadow w-[20rem] mr-4 mb-4"
          >
            <div className="w-full h-[10rem] rounded-md bg-green-500 mb-4">

            </div>
            <div className="">
              <h1 className="text-xl text-gray-950 font-bold">{project.name}</h1>
              <p className="text-md">{project.desc}</p>
              <p className="text-sm text-gray-700">Created By @{project.username}</p>
              <div className="flex justify-between">
              <div className="p-1 text-sm mt-3 bg-green-300 rounded-md flex items-center justify-center">{project.number}</div>
              <div className="p-1 text-sm scale-[0.9] mt-3 bg-gray-300 rounded-md flex items-center justify-center">{project.date}</div>
              </div>
              <button className="p-2  bg-blue-400 w-full rounded-md my-2">Join</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
