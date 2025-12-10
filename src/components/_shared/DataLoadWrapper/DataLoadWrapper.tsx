import { type ReactElement, useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export function DataLoadWrapper<T extends object>(props: {
  loader: () => Promise<T | undefined>;
  render: (props: T & { reload: () => void }) => ReactElement;
}) {
  const { render, loader } = props;

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await loader();
      setData(res);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (data) {
    return <>{render({ ...data, reload: loadData })}</>;
  }

  if (error) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant={"body2"}>Ошибка загрузки</Typography>
      </Box>
    );
  }

  return <></>;
}
