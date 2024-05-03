import { isPlayingAtom, timerAtom } from "../../Utils/Store";
import { useAtomValue } from "jotai";

export const MiniTimer = () => {
  const time = useAtomValue(timerAtom);
  const isPlaying = useAtomValue(isPlayingAtom);
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };
  return (
    <div className="my-4 text-center">
      {isPlaying && (
        <p className="text-xl font-medium tracking-wider">{`Your Timer: ${formatTime()}`}</p>
      )}
    </div>
  );
};
