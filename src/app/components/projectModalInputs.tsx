import React from "react";

interface Props {
  inputs: {
    projectName: string;
    projectDesc: string;
    ens: string;
    projectType: string;
    tokenType: string;
  };
  handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProjectModalInputs({ inputs, handleChangeInputs }: Props) {
  return (
    <div className="my-3 flex-col justify-between text-black text-sm">
      <input
        type="text"
        className="border text-center rounded p-2 py-3 w-full"
        placeholder="Name"
        value={inputs.projectName}
        onChange={handleChangeInputs}
        name="projectName"
      />
      <input
        type="text"
        className="border text-center rounded p-2 py-3 w-full"
        placeholder="Description"
        value={inputs.projectDesc}
        onChange={handleChangeInputs}
        name="projectDesc"
      />
      <input
        type="text"
        className="border text-center rounded p-2 py-3 w-full"
        placeholder="sub-ENS"
        value={inputs.ens}
        onChange={handleChangeInputs}
        name="ens"
      />
      <input
        type="text"
        className="border text-center rounded p-2 py-3 w-full"
        placeholder="Project type"
        value={inputs.projectType}
        onChange={handleChangeInputs}
        name="projectType"
      />
      <input
        type="text"
        className="border text-center rounded p-2 py-3 w-full"
        placeholder="Token Type"
        value={inputs.tokenType}
        onChange={handleChangeInputs}
        name="tokenType"
      />
    </div>
  );
}

export default ProjectModalInputs;
