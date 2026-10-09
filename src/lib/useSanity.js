import { useCallback, useEffect, useState } from "react";
import { client, sanityConfigured } from "./sanity";

/**
 * Runs a GROQ query against Sanity.
 * status: "unconfigured" | "loading" | "ready" | "error"
 */
const useSanity = (query, params) => {
  const [state, setState] = useState({
    status: sanityConfigured ? "loading" : "unconfigured",
    data: null,
  });
  const [attempt, setAttempt] = useState(0);
  const paramsKey = JSON.stringify(params || {});

  useEffect(() => {
    if (!sanityConfigured) return undefined;
    let active = true;
    setState((prev) => ({ ...prev, status: "loading" }));
    client
      .fetch(query, JSON.parse(paramsKey))
      .then((data) => active && setState({ status: "ready", data }))
      .catch(() => active && setState({ status: "error", data: null }));
    return () => {
      active = false;
    };
  }, [query, paramsKey, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
};

export default useSanity;
