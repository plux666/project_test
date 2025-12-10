import type { FC } from "react";
import { Box } from "@mui/material";

import "./styles.scss";

import { RoundsList } from "@/pages/GamePage/RoundsList/RoundsList.tsx";
import { Route, Routes } from "react-router";
import { WrappedRoundView } from "@/components/Rounds/RoundView/WrappedRoundView.tsx";

export const GamePage: FC = () => {
  return (
    <Box className={"game-page__main"}>
      <Routes>
        <Route path={":roundId"} element={<WrappedRoundView />} />
        <Route path={"/"} index element={<RoundsList />} />
      </Routes>
    </Box>
  );
};
