import React from "react";

interface useModalProps {
    isModalOpen: boolean;
}
export const useModal = ({isModalOpen}: useModalProps) => {
  const [isOpen, setIsOpen] = React.useState(isModalOpen);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle] as const;
};
