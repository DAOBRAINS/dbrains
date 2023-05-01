"use client";

import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { createDAO } from "../utils/createDAO";

/* export const metadata: Metadata = {
  title: "Projects Dashboard | DBrains",
  description: "The Fully Collaborative Freelancing Plateforme",
}; */

const createProject = () => {
  createDAO();
};

export default function ProjectsDashboard() {
  const projects = [
    {
      id: 1,
      name: "Vernithon project",
      desc: "create an art gallery crawl app",
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
    },
  ];
  return (
    <main className="mx-5 my-5">
      {/* <h1 className="my-5 text-2xl">Projects DashBoards</h1> */}
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-2xl text-gray-950 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={createDAO}
      >
        <PlusIcon
          className="-mr-0.5 h-5 w-5  text-gray-950"
          aria-hidden="true"
        />
        Create a Project
      </button>

      <ul role="list" className="space-y-3 mt-4 max-w-xl">
        {projects.map((project) => (
          <li
            key={project.id}
            className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
          >
            <div>
              <h1 className="text-2xl text-gray-950">{project.name}</h1>
              <p className="text-lg text-gray-600">{project.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
