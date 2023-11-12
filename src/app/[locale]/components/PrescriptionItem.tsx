'use client';

import type { MouseEvent } from 'react';
import { useState, useCallback, useRef } from 'react';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useIntl } from 'react-intl';
import Image from 'next/image';

import { HerbModel } from '@/core/types/models/herb';
import { HERB_PHOTO_ALT_TEXT, BLUR_DATA_URL, QUANTITIES } from '@/core/config/constants';
import DefaultHerbPhoto from '@/core/assets/img/ty-ba-diep.jpeg';
import Input from '@/core/components/Input';
import { i18nConfig, currencies, LOCALES } from '@/core/config/i18n';

export interface Quantifiable {
  quantity?: number;
}

interface PrescriptionItemProps {
  /**
   * Prescribed herb
   */
  herb: HerbModel & Quantifiable;
  /**
   * Fired on ordered quantity change
   */
  onQuantityChange?: (herb: HerbModel & Quantifiable) => void;
  /**
   * Fired on remove
   */
  onRemove?: (herb: HerbModel) => void;
}

export default function PrescriptionItem({
  herb,
  onQuantityChange,
  onRemove,
}: PrescriptionItemProps) {
  const locale = (useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale) as LOCALES;
  const intl = useIntl();

  const quantityInputEl = useRef<HTMLInputElement>(null);
  const [quantityInputValue, setQuantityInputValue] = useState(
    herb.quantity !== undefined ? herb.quantity.toString() : '',
  );
  const [quantity, setQuantity] = useState(herb.quantity ?? 35);
  const changeQuantity = useCallback(
    (value: string) => {
      const newQuantity = Math.abs(parseFloat(value));
      if (isNaN(newQuantity)) {
        setQuantityInputValue(quantity.toString());
      } else {
        setQuantityInputValue(newQuantity.toString());
        setQuantity(newQuantity);
        onQuantityChange?.({ ...herb, quantity: newQuantity });
      }
    },
    [quantity, onQuantityChange, herb],
  );
  const selectQuantity = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      changeQuantity(event.currentTarget.dataset.quantity!);
    },
    [changeQuantity],
  );
  const revertQuantityInputValue = useCallback(() => {
    setQuantityInputValue(quantity.toString());
    setTimeout(() => {
      quantityInputEl.current?.blur();
    }, 0);
  }, [quantity]);

  const remove = useCallback(() => {
    onRemove?.(herb);
  }, [onRemove, herb]);

  return (
    <div className="relative flex items-center gap-2 rounded-md bg-slate-100 p-5 shadow-md ring-1 ring-slate-500">
      <div className="h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={herb.photo || DefaultHerbPhoto}
          alt={HERB_PHOTO_ALT_TEXT}
          width={64}
          height={64}
          blurDataURL={herb.photo ? BLUR_DATA_URL : undefined}
          placeholder="blur"
        />
      </div>
      <div className="flex w-28 flex-col">
        <span className="line-clamp-1 overflow-hidden">{herb.displayedIn[locale]}</span>
        <span className="text-xs text-gray-500">
          {intl.formatNumber(herb.price, { style: 'currency', currency: currencies[locale] })}/kg
        </span>
      </div>
      <div className="grid grid-cols-[repeat(4,30px)] gap-2">
        {QUANTITIES.map((v) => (
          <div
            key={v}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
              v === quantity
                ? 'cursor-default bg-brand-700 text-white ring-2 ring-brand-600'
                : 'cursor-pointer ring-1 ring-slate-500 hover:bg-slate-500 hover:text-white'
            }`}
            data-quantity={v}
            onClick={selectQuantity}
          >
            {v}g
          </div>
        ))}
        <div className="col-span-2 h-7">
          <Input
            ref={quantityInputEl}
            trailingAddOn="g"
            placeholder={quantity.toString()}
            value={quantityInputValue}
            onChange={setQuantityInputValue}
            onBlur={changeQuantity}
            onEnter={changeQuantity}
            onEscape={revertQuantityInputValue}
          />
        </div>
      </div>
      <div
        role="button"
        className="absolute right-1 top-1 cursor-pointer hover:text-red-700"
        onClick={remove}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-3 w-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
}
