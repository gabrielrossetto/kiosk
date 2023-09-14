import { atom } from 'recoil';
import { Kiosk } from '../types/kiosk';

export const kioskState = atom<Kiosk[]>({
  key: 'kioskState',
  default: [],
});
