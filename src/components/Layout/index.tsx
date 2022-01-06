import { FunctionComponent } from "react";
import { Header } from "../Header";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
