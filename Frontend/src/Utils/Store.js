import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
const userAtom = atom(null);
const loadingAtom = atom(true);
const isAuthenticatedAtom = atom(false);
const timerAtom = atom(1500);
const googleCredentialsAtom = atomWithStorage("credentials", null);
const totalTimeAtom = atom(1500);
const isPlayingAtom = atom(false);
const sidebarOpenAtom = atom(false);
export {
  userAtom,
  loadingAtom,
  timerAtom,
  isPlayingAtom,
  totalTimeAtom,
  sidebarOpenAtom,
  googleCredentialsAtom,
  isAuthenticatedAtom,
};
