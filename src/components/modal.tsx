import React, { Dispatch, MouseEvent, SetStateAction } from "react";

interface IModal {
  children: JSX.Element;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setOpenModal, children }: IModal) => {
  const closeModal = (event: MouseEvent<HTMLDivElement>): void => {
    const classList = (event.target as HTMLDivElement).classList;
    if (classList.contains("modal-main")) {
      setOpenModal(false);
    }
  };

  return (
    <div className="modal-main" onClick={closeModal}>
      <div className="modal-inner c-r">{children}</div>
    </div>
  );
};

export default Modal;
