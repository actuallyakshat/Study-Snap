import { atom } from "jotai";

const clientUserAtom = atom(null);
const loadingAtom = atom(true);
const timerAtom = atom(1500);
const totalTimeAtom = atom(1500);
const isPlayingAtom = atom(false);
const sidebarOpenAtom = atom(false);

export {
  clientUserAtom,
  loadingAtom,
  timerAtom,
  isPlayingAtom,
  totalTimeAtom,
  sidebarOpenAtom,
};
