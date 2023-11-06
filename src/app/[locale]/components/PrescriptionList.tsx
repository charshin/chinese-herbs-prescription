'use client';

import { AnimatePresence } from 'framer-motion';

import type { HerbModel } from '@/core/types/models/herb';
import { MotionDiv } from '@/core/lib/motion';

import type { Quantifiable } from './PrescriptionItem';
import PrescriptionItem from './PrescriptionItem';

interface PrescriptionListProps {
  /**
   * List of prescribed herbs
   */
  herbs: (HerbModel & Quantifiable)[];
  /**
   * Fired on prescription item removed
   */
  onItemRemove?: (herb: HerbModel) => void;
  /**
   * Fired on prescription item quantity changed
   */
  onItemQuantityChange?: (herb: HerbModel & Quantifiable) => void;
}

export default function PrescriptionList({
  herbs,
  onItemQuantityChange,
  onItemRemove,
}: PrescriptionListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <AnimatePresence>
        {herbs.map((herb, idx) => (
          <MotionDiv
            key={herb.name}
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <PrescriptionItem
              herb={herb}
              onQuantityChange={onItemQuantityChange}
              onRemove={onItemRemove}
            />
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  );
}
