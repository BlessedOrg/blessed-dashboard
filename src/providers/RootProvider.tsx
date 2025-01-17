import { FixedLoading } from "@/components/ui/fixed-loading";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "../store/UserContext";

export const RootProvider = ({ children }) => {
  return (
    <>
      <Suspense fallback={<FixedLoading />}>
        <UserContextProvider>{children}</UserContextProvider>
      </Suspense>
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} theme={"dark"} newestOnTop={false} closeOnClick />
    </>
  );
};
