import { atom } from "jotai";
const userAtom = atom(null);
const loadingAtom = atom(true);
const timerAtom = atom(1500);
const totalTimeAtom = atom(1500);
const isPlayingAtom = atom(false);
export { userAtom, loadingAtom, timerAtom, isPlayingAtom, totalTimeAtom };
