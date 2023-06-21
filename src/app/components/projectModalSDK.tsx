"use client";

import { Fragment, useState, useEffect, useTransition } from "react";
import ProjectModalInputs from "./projectModalInputs";
import { Dialog, Transition } from "@headlessui/react";
import { createDbrainsDao } from "./createDbrainsDAO";
import { useAragonSDKContext } from "../context/AragonSDK";
import {
  Client,
  ContractVotingSettings,
  VotingMode,
  votingSettingsToContract,
} from "@aragon/sdk-client";
import { useAccount } from "wagmi";
import {
  EncodePluginInstallationProps,
  encodePluginInstallItem,
} from "@daobox/use-aragon";

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

  const [pending, startTransition] = useTransition();

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

  //createDAO params
  // Instantiate the general purpose client from the Aragon OSx SDK context.
  const { context } = useAragonSDKContext();
  console.log("context in projectModalSDK:", context);
  const client: Client = new Client(context);

  //types of data provided to prepareInstallation (votingSetting, tokenSetting, mintSetting)
  //same as for tokenVotingPlugin without the token address since we will always create an NTToken
  const dataTypes = [
    "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
    "tuple(string name, string symbol) tokenSettings",
    "tuple(address[] receivers, uint256[] amounts) mintSettings",
  ];

  const pluginParameters = [
    Object.values(
      votingSettingsToContract({
        minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
        minParticipation: 0.25, // 25%
        supportThreshold: 0.5, // 50%
        minProposerVotingPower: BigInt("5000"), // default 0
        votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
      })
    ) as ContractVotingSettings,
    { name: "DBrains Token", symbol: "DBR" },
    { receivers: [useAccount().address], amounts: [BigInt("1")] },
  ];

  const encodedData: EncodePluginInstallationProps = {
    types: dataTypes,
    repoAddress: "0x74BebBdC74b454394A466444BC09Ab2A18666Df0",
    parameters: pluginParameters,
  };

  const plugin = encodePluginInstallItem(encodedData);

  return (
    <div>
      <button
        className="bg-white text-black border p-1 px-4 rounded mr-3"
        onClick={handleOpen}
      >
        Create new Project
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                   </div> */}
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Project Creation
                      </Dialog.Title>
                      {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                      </p>
                    </div> */}
                    </div>
                  </div>
                  <div className="uppercase font-bold  text-black text-center pb-2 border-b mb-2">
                    <div className="=m-auto">
                      <ProjectModalInputs
                        inputs={inputs}
                        handleChangeInputs={handleChangeInputs}
                      />
                      <button
                        className="uppercase bg-red-600 w-full text-black p-3 rounded text-sm disabled:bg-gray-400"
                        onClick={() => {
                          startTransition(() => {
                            createDbrainsDao(client, inputs, plugin);
                          });
                        }}
                        disabled={disabled}
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                  {/*  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
