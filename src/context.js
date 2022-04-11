import React from "react";

const Context = React.createContext();

const Consumer = Context.Consumer;
const Provider = Context.Provider;

export { Consumer, Provider };

export default Context;
