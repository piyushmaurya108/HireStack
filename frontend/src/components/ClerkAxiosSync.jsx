import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setAxiosTokenGetter } from "../lib/axios";

function ClerkAxiosSync() {
  const { getToken } = useAuth();

  useEffect(() => {
    setAxiosTokenGetter(() => getToken());

    return () => {
      setAxiosTokenGetter(null);
    };
  }, [getToken]);

  return null;
}

export default ClerkAxiosSync;
