'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { HerbModel } from '@/core/types/models/herb';

import type { Prescribable } from './PickHerbs';
import type { Quantifiable } from './PrescriptionItem';
import PickHerbs from './PickHerbs';
import PrescriptionList from './PrescriptionList';
import PrescriptionSummary from './PrescriptionSummary';

interface PrescriptionProps {
  herbs: HerbModel[];
}

export default function Prescription({ herbs }: PrescriptionProps) {
  const [herbsWithAttrs, setHerbsWithAttrs] =
    useState<(HerbModel & Prescribable & Quantifiable)[]>(herbs);
  const lookupRef = useRef<Record<string, HerbModel & Prescribable & Quantifiable>>({});
  useEffect(() => {
    lookupRef.current = herbsWithAttrs.reduce(
      (acc: Record<string, HerbModel & Prescribable & Quantifiable>, v) => {
        acc[v.name] = v;
        return acc;
      },
      {},
    );
  }, [herbsWithAttrs]);
  useEffect(() => {
    const newHerbsWithAttrs = herbs.map((herb) => ({
      ...lookupRef.current[herb.name],
      ...herb,
    }));
    setHerbsWithAttrs(newHerbsWithAttrs);
  }, [herbs]);

  const prescribedHerbs = useMemo(
    () => herbsWithAttrs.filter((herb) => herb.prescribed),
    [herbsWithAttrs],
  );

  const changeQuantity = useCallback(
    (herb: HerbModel & Quantifiable) => {
      setHerbsWithAttrs(
        herbsWithAttrs.map((v) => (v.name === herb.name ? { ...v, quantity: herb.quantity } : v)),
      );
    },
    [herbsWithAttrs],
  );

  const removeHerb = useCallback(
    (herb: HerbModel) => {
      setHerbsWithAttrs(
        herbsWithAttrs.map((v) => (v.name === herb.name ? { ...v, prescribed: false } : v)),
      );
    },
    [herbsWithAttrs],
  );

  return (
    <div className="grid grid-cols-[200px_auto_400px] grid-rows-[80vh] gap-5">
      <PickHerbs herbs={herbsWithAttrs} onPickChange={setHerbsWithAttrs} />
      <div className="overflow-auto p-1">
        <PrescriptionList
          herbs={prescribedHerbs}
          onItemQuantityChange={changeQuantity}
          onItemRemove={removeHerb}
        />
      </div>
      <div className="overflow-auto p-1">
        <PrescriptionSummary herbs={prescribedHerbs} />
      </div>
    </div>
  );
}
