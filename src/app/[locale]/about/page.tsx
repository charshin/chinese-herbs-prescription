'use client';

import { useColorMode } from '@/core/utils/colorMode';

function CompA() {
  const [colorMode, setColorMode] = useColorMode();

  console.log('%cCompA', 'font-size: 12px; color: #00b3b3', colorMode);

  return (
    <>
      <p>A: {colorMode}</p>
      <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>
        Toggle color mode
      </button>
    </>
  );
}

function CompB() {
  const [colorMode] = useColorMode();

  console.log('%ccompB', 'font-size: 12px; color: #00b3b3', colorMode);

  return <p>B: {colorMode}</p>;
}

export default function Page() {
  return (
    <>
      <CompA />
      <CompB />
    </>
  );
}
