import { type FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router";

import "./styles.scss";

import { useRoundStatus } from "@/hooks/hooks.ts";
import { type RoundListItem } from "@/types/types.ts";

export const RoundCard: FC<RoundListItem> = ({ id, startTime, endTime }) => {
  const navigate = useNavigate();

  const status = useRoundStatus(startTime, endTime);

  return (
    <Card className={"round-card__main"}>
      <CardContent>
        <Box>
          ● Round ID:{" "}
          <Link onClick={() => navigate(`/rounds/${id}`)}>{id}</Link>
        </Box>
        <Box my={2}>
          <Typography variant={"body1"}>
            Старт: {moment(startTime).format("DD.MM.YYYY, HH:mm:ss")}
          </Typography>
          <Typography variant={"body1"}>
            Конец: {moment(endTime).format("DD.MM.YYYY, HH:mm:ss")}
          </Typography>
        </Box>
        <Divider />
        <Typography mt={1} variant={"body1"}>
          Статус: {status}
        </Typography>
      </CardContent>
    </Card>
  );
};
