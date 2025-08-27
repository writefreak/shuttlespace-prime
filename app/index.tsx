import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  // const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  return token ? <Redirect href={"/home"} /> : <Redirect href={"/request"} />;
}
