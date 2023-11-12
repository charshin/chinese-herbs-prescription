'use client';

import ClientComponentRenderPhaseProvider from '@/core/utils/render';
import ColorModeProvider, { useColorMode } from '@/core/utils/colorMode';

function Html({ children }: { children: React.ReactNode }) {
  const [colorMode] = useColorMode();

  return (
    <html lang="en" className={colorMode === 'dark' ? 'dark' : undefined}>
      {children}
    </html>
  );
}

export default function CustomHtml({ children }: { children: React.ReactNode }) {
  return (
    <ClientComponentRenderPhaseProvider>
      <ColorModeProvider>
        <Html>{children}</Html>
      </ColorModeProvider>
    </ClientComponentRenderPhaseProvider>
  );
}
