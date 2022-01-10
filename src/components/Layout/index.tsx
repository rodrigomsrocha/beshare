import { FunctionComponent } from "react";
import { Header } from "../Header";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
