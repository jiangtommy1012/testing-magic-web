import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** 三個畫面：初始鎖屏 → 輸入密碼 → 假桌面 */
export type Screen = 'initial' | 'passcode' | 'home';

export interface LockState {
  /** 目前顯示的畫面 */
  screen: Screen;
  /** 已輸入的密碼數字 */
  input: string;
  /** 過渡期間鎖住輸入，避免重複觸發 */
  locked: boolean;
  /** 螢幕是否熄滅（點手電筒後蓋一層全黑，點一下回到原畫面） */
  screenOff: boolean;
}

const initialState: LockState = {
  screen: 'initial',
  input: '',
  locked: false,
  screenOff: false,
};

const lockSlice = createSlice({
  name: 'lock',
  initialState,
  reducers: {
    /** 上滑後從初始鎖屏切到輸入密碼畫面 */
    showPasscode(state) {
      state.screen = 'passcode';
    },
    /**
     * 按下一個數字。maxLength 由呼叫端（來自 Context 的 passcodeLength）傳入，
     * 讓 slice 不需要知道設定值。已鎖住或已滿則忽略。
     */
    addDigit(state, action: PayloadAction<{ digit: string; maxLength: number }>) {
      const { digit, maxLength } = action.payload;
      if (state.locked || state.input.length >= maxLength) return;
      state.input += digit;
    },
    /** 清空目前輸入（取消鍵 / 解鎖後重置） */
    clearInput(state) {
      state.input = '';
    },
    /** 過渡期間鎖住輸入 */
    setLocked(state, action: PayloadAction<boolean>) {
      state.locked = action.payload;
    },
    /** 解鎖：切到假桌面並重置輸入狀態 */
    unlock(state) {
      state.screen = 'home';
      state.input = '';
      state.locked = false;
    },
    /** 熄滅螢幕（蓋上全黑層） */
    turnScreenOff(state) {
      state.screenOff = true;
    },
    /** 點黑屏任一處 → 回到原本的畫面 */
    turnScreenOn(state) {
      state.screenOff = false;
    },
    /** 回到初始鎖屏（全部重置） */
    reset() {
      return initialState;
    },
  },
});

export const {
  showPasscode,
  addDigit,
  clearInput,
  setLocked,
  unlock,
  turnScreenOff,
  turnScreenOn,
  reset,
} = lockSlice.actions;
export default lockSlice.reducer;
