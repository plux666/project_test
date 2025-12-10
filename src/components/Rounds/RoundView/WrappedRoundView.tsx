import { DataLoadWrapper } from "@/components/_shared/DataLoadWrapper/DataLoadWrapper.tsx";
import type { Round } from "@/types/types.ts";
import { useParams } from "react-router";
import { getRoundById } from "@/api/rounds/rounds_api.ts";
import { RoundView } from "@/components/Rounds/RoundView/RoundView.tsx";

export function WrappedRoundView() {
  const { roundId } = useParams();

  const loader = async (id: string) => {
    try {
      const res = await getRoundById(id);

      return { roundData: res };
    } catch (e) {
      console.error(e);
    }
  };

  if (roundId) {
    return (
      <DataLoadWrapper<{ roundData: Round; reload?: () => void }>
        loader={() => loader(roundId)}
        render={(props) => <RoundView {...props} />}
      />
    );
  }
}
