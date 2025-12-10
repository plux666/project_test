import type {
  ResponsePagination,
  Round,
  RoundListItem,
} from "@/types/types.ts";

export type RoundsListResponse = {
  data: RoundListItem[];
  pagination: ResponsePagination;
};

export type TapResponse = {
  taps: number;
  score: number;
};

export const getRoundsList = async ({
  status,
  cursor,
  limit,
  signal,
}: {
  status?: "active" | "cooldown";
  cursor?: number | null;
  limit?: number;
  signal?: AbortSignal;
}) => {
  const params = new URLSearchParams();
  if (cursor) {
    params.append("cursor", String(cursor));
  }
  if (limit) {
    params.append("limit", String(limit));
  }
  if (status) {
    params.append("status", String(status));
  }

  const response = await fetch(`/api/rounds?` + params.toString(), {
    method: "GET",
    signal,
  });

  if (!response.ok) throw await response.json();
  return response.json();
};

export const getRoundById = async (
  id: string,
  signal?: AbortSignal,
): Promise<Round> => {
  const response = await fetch(`/api/rounds/${id}`, {
    method: "GET",
    signal,
  });

  if (!response.ok) throw await response.json();
  return response.json();
};

export const sendTapById = async (
  id: string,
  signal?: AbortSignal,
): Promise<TapResponse> => {
  const response = await fetch(`/api/rounds/${id}/tap`, {
    method: "POST",
    signal,
  });

  if (!response.ok) throw await response.json();
  return response.json();
};

export const createRound = async (
  signal?: AbortSignal,
): Promise<{ id: string }> => {
  const response = await fetch(`/api/rounds`, {
    method: "POST",
    signal,
  });

  if (!response.ok) throw await response.json();
  return response.json();
};
