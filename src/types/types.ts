export type ResponsePagination = {
  limit: number;
  nextCursor: number | null;
  hasMore: boolean;
};

export type RoundListItem = {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
};

export type Round = {
  round: {
    id: string;
    startTime: string;
    endTime: string;
    totalScore: number;
    createdAt: string;
  };
  topStats: [
    {
      taps: number;
      score: number;
      user: {
        username: string;
      };
    },
  ];
  myStats: {
    taps: number;
    score: number;
  };
};
