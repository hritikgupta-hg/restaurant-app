import React, { Fragment } from "react";
import { createPortal } from "react-dom";

const BackDrop = (props) => {
  return (
    <div
      onClick={() => {
        props.close(false);
      }}
      className=" fixed top-0 left-0 w-[100vw] h-[100vh] z-[102] bg-[#000000e4]"
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-100 rounded-lg z-[102]">
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("popup");
const Modal = (props) => {
  return createPortal(
    <Fragment>
      <BackDrop close={props.close} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>,
    portalElement
  );
};

export default Modal;
