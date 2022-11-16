import React from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle] as const;
};
