import React from "react";

import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <div>
      <Oval color="#00BFFF" height={80} width={80} />
      Loading...
    </div>
  );
};

export default Loader;
