"use client";

import { Metadata } from "next";
import CreateDaoBox from "../components/createDaoBox";
import CreateProject from "../components/createProjectSDK";
import ProjectModal from "../components/projectModal";

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
    },
    {
      id: 2,
      name: "Tradeasy project",
      desc: "create an AI assisted trading app",
    },
  ];
  return (
    <main className="mx-5 my-5">
      <CreateDaoBox />
      <ProjectModal />

      <h1 className="my-5 text-2xl">Join a Project:</h1>

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
