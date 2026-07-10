import React from "react";


export const ContainerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between">
      {children}
    </div>
  );
};
