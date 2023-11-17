'use client';

import { useEffect } from 'react';
import { initFlowbite } from 'flowbite';

export default function InitFlowbite({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFlowbite();
  }, []);

  return children;
}
