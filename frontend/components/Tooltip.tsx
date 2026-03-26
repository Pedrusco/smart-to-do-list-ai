'use client';

import { createPortal } from 'react-dom';

export function Tooltip({
  text,
  position,
}: {
  text: string;
  position: { x: number; y: number };
}) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
      }}
      className="z-9999 bg-zinc-900 border border-zinc-700 text-sm text-white p-2 rounded shadow-lg max-w-xs wrap-break-word"
    >
      {text}
    </div>,
    document.body,
  );
}
