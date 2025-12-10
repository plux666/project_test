import { useCallback, useEffect, useRef, useState } from "react";

import {
  getRoundsList,
  type RoundsListResponse,
} from "@/api/rounds/rounds_api.ts";
import type { ROUND_STATUS } from "@/constants.ts";
import { calculateStatus } from "@/utils.ts";

export function useRoundsList() {
  // бэк не принимает несколько статусов одновременно
  const [dataActive, setDataActive] = useState<RoundsListResponse["data"]>([]);
  const [dataCooldown, setDataCooldown] = useState<RoundsListResponse["data"]>(
    [],
  );
  const [paginationActive, setPaginationActive] = useState<
    RoundsListResponse["pagination"] | null
  >(null);
  const [paginationCooldown, setPaginationCooldown] = useState<
    RoundsListResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (controller: AbortController) => {
      setLoading(true);
      setError(null);

      try {
        if (!paginationActive || paginationActive?.hasMore) {
          const resActive = await getRoundsList({
            status: "active",
            signal: controller.signal,
            cursor: paginationActive?.nextCursor,
            limit: 10,
          });

          setDataActive((value) =>
            value ? [...value, ...resActive.data] : resActive.data,
          );
          if (resActive.data.length) {
            setPaginationActive(resActive.pagination);
          }
        }

        if (!paginationCooldown || paginationCooldown?.hasMore) {
          const resCoolddown = await getRoundsList({
            status: "cooldown",
            signal: controller.signal,
            cursor: paginationCooldown?.nextCursor,
            limit: 10,
          });

          setDataCooldown((value) =>
            value ? [...value, ...resCoolddown.data] : resCoolddown.data,
          );
          if (resCoolddown.data.length) {
            setPaginationCooldown(resCoolddown.pagination);
          }
        }
      } catch (err) {
        // @ts-expect-error unknown
        if (err.name !== "AbortError") {
          setError("Ошибка загрузки");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [paginationActive, paginationCooldown],
  );

  const loadMore = useCallback(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    fetchData(controller);
  }, [fetchData]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, []);

  return {
    rounds: [...dataCooldown, ...dataActive],
    loading,
    error,
    hasMore: paginationActive?.hasMore || paginationCooldown?.hasMore,
    loadMore,
  };
}

export function useRoundStatus(startTime?: string, endTime?: string) {
  const [status, setStatus] = useState<
    (typeof ROUND_STATUS)[keyof typeof ROUND_STATUS] | "Неизвестно"
  >("Неизвестно");

  useEffect(() => {
    if (!startTime || !endTime) return setStatus("Неизвестно");

    const updateStatus = () => {
      const newStatus = calculateStatus(startTime, endTime);

      setStatus((prev) => (prev !== newStatus ? newStatus : prev));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 500);

    return () => clearInterval(interval);
  }, [startTime, endTime, calculateStatus]);

  return status;
}
