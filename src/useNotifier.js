import { useContext } from "react";
import Context from "./context";

const useNotifier = () => useContext(Context);

export default useNotifier;
