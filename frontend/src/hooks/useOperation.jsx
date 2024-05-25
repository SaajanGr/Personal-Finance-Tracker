import { useContext } from "react";
import OperationContext from "../context/OperationContext";

// Hook to use the operation context
const useOperation = () => {
  return useContext(OperationContext);
};

export default useOperation;
