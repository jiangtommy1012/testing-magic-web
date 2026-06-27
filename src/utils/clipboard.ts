/**
 * 複製文字到剪貼簿。
 * 優先用 navigator.clipboard（需 HTTPS / localhost），失敗時退回 execCommand。
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      /* 落到下面的 fallback */
    }
  }
  fallbackCopy(text);
}

function fallbackCopy(text: string): void {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  } catch {
    /* 靜默失敗，維持鎖屏「不顯示任何文字」的體驗 */
  }
}
