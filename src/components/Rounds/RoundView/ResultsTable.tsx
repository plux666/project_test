import { type FC, useMemo } from "react";
import type { Round } from "@/types/types.ts";
import { Grid, Typography } from "@mui/material";

export const ResultsTable: FC<{ roundData: Round }> = ({ roundData }) => {
  // С бэкенда на приходит признак "лучший" и общее кол-во очков, высчитываем
  const total = useMemo(() => {
    if (roundData.topStats?.length) {
      return roundData.topStats.reduce((total, currentValue) => {
        return total + currentValue.score;
      }, 0);
    }

    return 0;
  }, [roundData]);

  const bestUserIndex = useMemo(() => {
    let idx = 0;
    let currentHigh = 0;
    roundData.topStats.forEach((stat, i) => {
      if (stat.score > currentHigh) {
        currentHigh = stat.score;
        idx = i;
      }
    });

    return idx;
  }, [roundData]);

  return (
    <Grid
      container
      direction="row"
      gap={1}
      sx={{
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "400px",
      }}
    >
      <Grid size={6}>
        <Typography variant={"body2"}>Всего: </Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant={"body2"}>{total}</Typography>
      </Grid>
      <Grid size={6}>
        <Typography variant={"body2"}>
          Победитель - {roundData.topStats[bestUserIndex]?.user.username}
        </Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant={"body2"}>
          {roundData.topStats[bestUserIndex]?.score}
        </Typography>
      </Grid>
      <Grid size={6}>
        <Typography variant={"body2"}>Мои очки</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant={"body2"}>{roundData.myStats?.score}</Typography>
      </Grid>
    </Grid>
  );
};
