import { useRef, type PointerEvent, type WheelEvent } from 'react';

const THRESHOLD = 60; // 上滑超過這個距離（px）就觸發

/**
 * 上滑解鎖手勢。回傳一組事件 handler，綁到要監聽的元素上。
 * - 觸控 / 滑鼠：用 Pointer Events 統一處理拖曳
 * - 桌面：滾輪往上、或單純點擊也能觸發（兜底）
 */
export function useSwipeUp(onSwipeUp: () => void) {
  const startY = useRef<number | null>(null);
  const moved = useRef(false);

  return {
    onPointerDown(e: PointerEvent) {
      startY.current = e.clientY;
      moved.current = false;
    },
    onPointerMove(e: PointerEvent) {
      if (startY.current === null) return;
      if (startY.current - e.clientY > THRESHOLD) {
        moved.current = true;
        startY.current = null;
        onSwipeUp();
      }
    },
    onPointerUp() {
      // 沒有達到拖曳門檻時，當作點擊也觸發（兜底，方便桌面測試）
      if (startY.current !== null && !moved.current) onSwipeUp();
      startY.current = null;
    },
    onWheel(e: WheelEvent) {
      if (e.deltaY < 0) onSwipeUp();
    },
  };
}
