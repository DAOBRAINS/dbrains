"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProjectModalInputs from "./projectModalInputs";
//import { useAragonSDKContext } from "../context/AragonSDK";
import { useAccount } from "wagmi";
import { DaoMetadata, VotingMode } from "@aragon/sdk-client";
import {
  encodePluginInstallItem,
  EncodePluginInstallationProps,
  encodeTokenVotingPlugin,
  useNewDao,
} from "@daobox/use-aragon";
import Link from "next/link";
import { Dialog } from "@mui/material";

const style = {
  position: "relative" as "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface Inputs {
  projectName: string;
  projectDesc: string;
  ens: string;
  projectType: string;
  tokenType: string;
}

export default function ProjectModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [inputs, setInputs] = useState({
    projectName: "",
    projectDesc: "",
    ens: "",
    projectType: "",
    tokenType: "",
  } as Inputs);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      inputs.projectName &&
      inputs.projectDesc &&
      inputs.ens &&
      inputs.projectType &&
      inputs.tokenType
    ) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [inputs]);

  const createProject = () => {
    mutate?.();
  };

  const daoMetadata: DaoMetadata = {
    name: inputs.projectName,
    description: inputs.projectDesc,
    links: [],
  };

  /* const plugin = encodeTokenVotingPlugin({
    votingSettings: {
      minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
      minParticipation: 0.25, // 25%
      supportThreshold: 0.5, // 50%
      minProposerVotingPower: BigInt("5000"), // default 0
      votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
    },
    newToken: {
      name: "DBRAIN Test Token", // the name of your token
      symbol: "DBR", // the symbol for your token. shouldn't be more than 5 letters
      decimals: 18, // the number of decimals your token uses
      minter: "0x8D60bA6B9F9e47C464F54C28744bD0ce5F180deF",
      balances: [
        {
          // Defines the initial balances of the new token
          address: "0xE60930Dd528485BA57F4a17b02209877C2A9bFaC", //address!, // address of the account to receive the newly minted tokens
          balance: BigInt(1), // amount of tokens that address should receive
        },
      ],
    },
    network: "mumbai",
  }); */

  //types of data provided to prepareInstallation (votingSetting, tokenSetting, mintSetting)
  //same as for tokenVotingPlugin without the token address since we will always create an NTToken
  const dataTypes = [
    "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
    "tuple(string name, string symbol) tokenSettings",
    "tuple(address[] receivers, uint256[] amounts) mintSettings",
  ];

  const pluginParameters = [
    {
      minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
      minParticipation: 0.25, // 25%
      supportThreshold: 0.5, // 50%
      minProposerVotingPower: BigInt("5000"), // default 0
      votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
    },
    { name: "DBrains Token", symbol: "DBR" },
    { receivers: [], amounts: [] },
  ];

  const encodedData: EncodePluginInstallationProps = {
    types: dataTypes,
    repoAddress: "0x4A0862795A79302FB102d5dba42ed7160a6AB08b",
    parameters: pluginParameters,
  };

  const plugin = encodePluginInstallItem(encodedData);

  const { mutate, creationStatus, data, error } = useNewDao({
    daoMetadata,
    ensSubdomain: inputs.ens,
    plugins: [plugin],
  });

  return (
    <div>
      <button
        className="bg-white text-black border p-1 px-4 rounded mr-3"
        onClick={handleOpen}
      >
        Create new Project
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="uppercase font-bold  text-black text-center pb-2 border-b mb-2">
            Project Creation
            <div />
            <div className="=m-auto">
              <ProjectModalInputs
                inputs={inputs}
                handleChangeInputs={handleChangeInputs}
              />
              <button
                className="uppercase bg-red-600 w-full text-black p-3 rounded text-sm disabled:bg-gray-400"
                onClick={createProject}
                disabled={disabled}
              >
                Create Project
              </button>
              <h3 className="text-black p-3 justify-start">
                Status: {creationStatus}
              </h3>
              <h3 className="text-black p-3 justify-start">
                data:
                <pre>
                  {JSON.stringify(
                    data,
                    (_, v) => (typeof v === "bigint" ? v.toString() : v),
                    2
                  )}
                </pre>
              </h3>
              {data && (
                <Link
                  href={`https://app.aragon.org/#/daos/goerli/${data.daoAddress}/dashboard`}
                  className="text-black p-3 justify-start"
                >
                  Go to Dao
                </Link>
              )}
              {error && <h3>Error: {error?.message}</h3>}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
