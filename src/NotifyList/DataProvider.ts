import React, { useEffect } from "react";
import { HistoryRow } from "./Types.ts";
import { API_URL } from "../Config.ts";

export function useServerHistory(): [HistoryRow[] | null, () => void] {
  const [data, setData] = React.useState<HistoryRow[] | null>(null);

  useEffect(() => {
    if(data) return;
    (async () => {
      const response = await fetch(`${API_URL}/api/history`);
      if(response.status != 200)
        return alert("Failed to laod data");
      setData((await response.json()).history);
    })();
  }, [data]);

  return [data, () => setData(null)];
}
