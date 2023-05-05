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
    <div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Name"
          value={inputs.projectName}
          onChange={handleChangeInputs}
          name="projectName"
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Description"
          value={inputs.projectDesc}
          onChange={handleChangeInputs}
          name="projectDesc"
        />
      </div>

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="sub-ENS"
          value={inputs.ens}
          onChange={handleChangeInputs}
          name="ens"
        />
      </div>

      <div className="my-3 flex justify-between text-sm">
        <input
          type="Phone"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Project type"
          value={inputs.projectType}
          onChange={handleChangeInputs}
          name="projectType"
        />
        <input
          type="City"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Token Type"
          value={inputs.tokenType}
          onChange={handleChangeInputs}
          name="tokenType"
        />
      </div>
    </div>
  );
}

export default ProjectModalInputs;
