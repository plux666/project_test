import type { FC, MouseEvent } from "react";
import { Box } from "@mui/material";

import "./styles.scss";

const gus = `░░░░░░░░░░ТАПАЕМ░░░░░░░░░░░░░░░
░░░░░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░░░░░░░░░
░░░░▄███▀░◐░░░▌░░░░░░░░░░░░░░░░░░░
░░░░░░░░▌░░░░░▐░░░░░░░░░░░░░░░░░░░
░░░░░░░░▐░░░░░▐░░░░░░░░░░░░░░░░░░░
░░░░░░░░▌░░░░░▐▄▄░░░░░░░░░░░░░░░░░
░░░░░░░░▌░░░░▄▀▒▒▀▀▀▀▄░░░░░░░░░░░░
░░░░░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄░░░░░░░░░░
░░░░░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄░░░░░░░░
░░░░░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄░░░░░░
░░░░░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄░░░░
░░░░░░░░░░░░░░░▌▌▌▌░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░▌▌░▌▌░░░░░░░░░░░░░░
░░░░░░░░░░░░░▄▄▌▌▄▌▌░░░░░░░░░░░░░░`;

export const Goose: FC<{
  onClick: () => void;
  disabled: boolean;
}> = ({ onClick, disabled }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    onClick();

    const el = e.currentTarget;

    el.classList.remove("goose__shake");
    void el.offsetWidth;
    el.classList.add("goose__shake");
  };

  return (
    <Box
      className={`goose__art ${disabled ? "goose__art--disabled" : ""}`}
      sx={{ whiteSpace: "pre", fontFamily: "monospace" }}
      onClick={handleClick}
    >
      {gus}
    </Box>
  );
};
