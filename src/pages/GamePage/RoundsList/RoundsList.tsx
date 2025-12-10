import { type FC, useCallback } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { RefreshOutlined } from "@mui/icons-material";

import "./styles.scss";

import { RoundCard } from "@/components/Rounds/RoundCard/RoundCard.tsx";
import { useUserSelector } from "@/stores/userStore";
import { useRoundsList } from "@/hooks/hooks.ts";
import { createRound } from "@/api/rounds/rounds_api.ts";

export const RoundsList: FC = () => {
  const userData = useUserSelector();
  const navigate = useNavigate();

  const { rounds, loadMore, hasMore, loading } = useRoundsList();

  const onCreateRound = useCallback(async () => {
    try {
      const data = await createRound();
      navigate(`/rounds/${data.id}`);
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  console.log(loading);
  return (
    <Box className={"rounds-list__main"}>
      <Box className={"rounds-list__container"}>
        <Grid container>
          <Grid size={8}>
            <Typography variant={"h5"}>Список РАУНДОВ</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant={"body1"}>
              {userData ? userData.username : ""}
            </Typography>
          </Grid>
        </Grid>

        {userData?.role === "ADMIN" ? (
          <Box my={4}>
            <Button variant={"contained"} onClick={onCreateRound}>
              Создать раунд
            </Button>
          </Box>
        ) : (
          <></>
        )}

        <Box className={"rounds-list__rounds-container"}>
          {rounds.length ? (
            rounds?.map((r) => (
              <Box my={3} key={r.id}>
                <RoundCard {...r} />
              </Box>
            ))
          ) : (
            <Button
              onClick={loadMore}
              variant={"contained"}
              endIcon={<RefreshOutlined />}
            >
              Обновить
            </Button>
          )}
          {loading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <></>
          )}
          {rounds.length ? (
            <Button
              variant={"outlined"}
              onClick={loadMore}
              disabled={!hasMore || loading}
            >
              Загрузить еще
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};
