"use client";

import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProjectModalInputs from "./projectModalInputs";
/* import useAuth from "../../hooks/useAuth"; */
/* import { AuthentificationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material"; */
import CreateProject, { Inputs } from "./createProjectSDK";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProjectModal() {
  /* const { loading, data, error, setAuthState } = useContext(
    AuthentificationContext
  ); */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /* const { signin } = useAuth();
   */
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

  const handleClick = () => {
    CreateProject(inputs);
  };

  return (
    <div>
      <button
        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
        onClick={handleOpen}
      >
        Create Project
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="uppercase font-bold text-center pb-2 border-b mb-2">
            Project Creation
            <div />
            <div className="=m-auto">
              <ProjectModalInputs
                inputs={inputs}
                handleChangeInputs={handleChangeInputs}
              />
              <button
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm"
                onClick={handleClick}
                disabled={disabled}
              >
                Create Project
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
