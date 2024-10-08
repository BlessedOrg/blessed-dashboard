import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "../store/UserContext";
import { Suspense } from "react";
import { FixedLoading } from "@/components/ui/fixed-loading";

export const RootProvider = ({ children }) => {
  return (
    <>
      <Suspense fallback={<FixedLoading />}>
        <UserContextProvider>{children}</UserContextProvider>
      </Suspense>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        theme={"dark"}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
};
