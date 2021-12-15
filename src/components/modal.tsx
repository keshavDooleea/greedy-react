import React, { Dispatch, MouseEvent, SetStateAction } from "react";

interface IModal {
  children: JSX.Element;
  setLoadInstanceModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setLoadInstanceModal, children }: IModal) => {
  const closeModal = (event: MouseEvent<HTMLDivElement>): void => {
    const classList = (event.target as HTMLDivElement).classList;
    if (classList.contains("modal-main")) {
      setLoadInstanceModal(false);
    }
  };

  return (
    <div className="modal-main" onClick={closeModal}>
      <div className="modal-inner c-r">{children}</div>
    </div>
  );
};

export default Modal;
