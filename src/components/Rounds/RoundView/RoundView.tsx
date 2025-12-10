import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import throttle from "lodash.throttle";
import { useNavigate } from "react-router";

import "./styles.scss";

import { useUserSelector } from "@/stores/userStore";
import { Goose } from "@/components/Rounds/RoundView/Goose/Goose.tsx";
import { useRoundStatus } from "@/hooks/hooks.ts";
import type { Round } from "@/types/types.ts";
import { Timer } from "@/components/_shared/Timer/Timer.tsx";
import { sendTapById } from "@/api/rounds/rounds_api.ts";
import { ROUND_STATUS } from "@/constants.ts";
import { ResultsTable } from "@/components/Rounds/RoundView/ResultsTable.tsx";

export const RoundView: FC<{ roundData: Round; reload?: () => void }> = ({
  roundData,
  reload,
}) => {
  const navigate = useNavigate();
  const userData = useUserSelector();

  const prevStatus = useRef<
    (typeof ROUND_STATUS)[keyof typeof ROUND_STATUS] | "Неизвестно"
  >("Неизвестно");

  const [tappedScore, setTappedScore] = useState(roundData.myStats.score);

  const status = useRoundStatus(
    roundData.round.startTime,
    roundData.round.endTime,
  );
  const refreshScore = (score: number) => setTappedScore(score);

  // eslint-disable-next-line react-hooks/use-memo
  const throttledRefreshScore = useCallback(throttle(refreshScore, 200), []);

  const tap = async () => {
    if (status !== ROUND_STATUS.ACTIVE) return;

    try {
      const res = await sendTapById(roundData.round.id);

      throttledRefreshScore(res.score);
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: Идея с оберткой загрузки оказалось слегка непродуманной, поэтому пока что тут будет костыль
  useEffect(() => {
    if (
      prevStatus.current === ROUND_STATUS.ACTIVE &&
      status === ROUND_STATUS.FINISHED
    ) {
      if (reload) {
        reload();
      } else {
        navigate(`/rounds/${roundData.round.id}`);
      }
    }

    prevStatus.current = status;
  }, [status]);

  return (
    <Box className={"rounds-view__main"}>
      <Box className={"rounds-view__round"}>
        {roundData ? (
          <>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Button
                color={"secondary"}
                variant={"outlined"}
                onClick={() => navigate("/rounds")}
              >
                Вернуться
              </Button>
              <Typography>{userData ? userData.username : ""}</Typography>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <Goose
              onClick={() => tap()}
              disabled={status !== ROUND_STATUS.ACTIVE}
            />
            <Divider sx={{ width: "100%" }} />
            <Typography variant={"body2"}>Статус: {status}</Typography>
            <Divider sx={{ width: "100%" }} />
            <>
              {status === ROUND_STATUS.COOLDOWN ? (
                <Box className={"rounds-view__timer"}>
                  <Typography variant={"body2"}>
                    До начала осталось:{" "}
                  </Typography>
                  <Timer targetDate={roundData.round.startTime} />
                </Box>
              ) : status === ROUND_STATUS.ACTIVE ? (
                <>
                  <Box className={"rounds-view__timer"}>
                    <Typography variant={"body2"}>
                      До конца осталось:{" "}
                    </Typography>
                    <Timer targetDate={roundData.round.endTime} />
                  </Box>
                  <Typography variant={"body2"}>
                    Мои очки: {tappedScore}
                  </Typography>
                </>
              ) : status === ROUND_STATUS.FINISHED ? (
                <ResultsTable roundData={roundData} />
              ) : (
                <></>
              )}
            </>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
