import { createContext } from "react";

const Context = createContext();

const Consumer = Context.Consumer;
const Provider = Context.Provider;

export { Consumer, Provider };

export default Context;
