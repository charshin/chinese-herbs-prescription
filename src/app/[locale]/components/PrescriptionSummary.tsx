'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useIntl } from 'react-intl';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { LOCALES, currencies, i18nConfig } from '@/core/config/i18n';
import { HerbModel } from '@/core/types/models/herb';

import { Quantifiable } from './PrescriptionItem';

interface PrescriptionSummaryProps {
  herbs: (HerbModel & Quantifiable)[];
}

export default function PrescriptionSummary({ herbs }: PrescriptionSummaryProps) {
  const locale = (useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale) as LOCALES;
  const intl = useIntl();

  const totalCost = useMemo(
    () => herbs.reduce((sum, herb) => sum + (herb.price * (herb.quantity ?? 0)) / 1000, 0),
    [herbs],
  );

  const formEl = useRef<HTMLDivElement>(null);
  const print = useCallback(async () => {
    if (!formEl.current) return;
    const canvas = await html2canvas(formEl.current);
    const imgDataUrl = canvas.toDataURL('image/png');

    const formElWidth = formEl.current.offsetWidth;
    const formElHeight = formEl.current.offsetHeight;

    const pdf = new jsPDF({
      orientation: formElWidth >= formElHeight ? 'landscape' : 'portrait',
      unit: 'px',
    });
    pdf.internal.pageSize.width = formElWidth;
    pdf.internal.pageSize.height = formElHeight;
    pdf.addImage(imgDataUrl, 'png', 0, 0, formElWidth, formElHeight);
    pdf.save('chinese-herbs-prescribe-form.pdf');
  }, []);

  const download = useCallback(() => {
    const headers = [
      intl.formatMessage({ id: 'prescription-summary.header.col-no' }),
      intl.formatMessage({ id: 'prescription-summary.header.col-herb' }),
      intl.formatMessage({ id: 'prescription-summary.header.col-quantity' }),
      intl.formatMessage({ id: 'prescription-summary.header.col-cost' }),
    ];
    const rows = herbs.map((herb, idx) => [
      idx + 1,
      herb.displayedIn[locale],
      herb.quantity ?? 0,
      intl.formatNumber((herb.price * (herb.quantity ?? 0)) / 1000, {
        style: 'currency',
        currency: currencies[locale],
      }),
    ]);
    const footers = [
      '',
      '',
      'Total',
      intl.formatNumber(totalCost, {
        style: 'currency',
        currency: currencies[locale],
      }),
    ];

    const csv = `data:text/csv;charset=utf-8,${headers.join(',')}\n${rows
      .map((v) => v.join(','))
      .join('\n')}\n${footers.join(',')}`;
    window.open(encodeURI(csv));
  }, [herbs, totalCost, intl, locale]);

  return (
    <div
      ref={formEl}
      className="flex flex-col overflow-hidden rounded-md shadow-md ring-1 ring-slate-500"
    >
      <div className="grid grid-cols-[50px_2fr_70px_1fr] gap-2 bg-brand-700 py-1 font-medium text-white">
        <span className="justify-self-center">
          {intl.formatMessage({ id: 'prescription-summary.header.col-no' })}
        </span>
        <span>{intl.formatMessage({ id: 'prescription-summary.header.col-herb' })}</span>
        <span className="justify-self-center">
          {intl.formatMessage({ id: 'prescription-summary.header.col-quantity' })}
        </span>
        <span className="justify-self-end pr-5">
          {intl.formatMessage({ id: 'prescription-summary.header.col-cost' })}
        </span>
      </div>
      {herbs.map((herb, idx) => (
        <div
          key={herb.name}
          className={`grid grid-cols-[50px_2fr_70px_1fr] gap-2 py-1 text-slate-600 ${
            idx % 2 !== 0 ? 'bg-slate-200' : ''
          }`}
        >
          <span className="justify-self-center">{idx + 1}</span>
          <span>{herb.displayedIn[locale]}</span>
          <span className="justify-self-center">{herb.quantity ?? 0}g</span>
          <span className="justify-self-end pr-5">
            {intl.formatNumber((herb.price * (herb.quantity ?? 0)) / 1000, {
              style: 'currency',
              currency: currencies[locale],
            })}
          </span>
        </div>
      ))}
      <div className="grid grid-cols-[50px_2fr_70px_1fr] gap-2 bg-slate-500 py-1 font-medium text-white">
        <div className="col-span-2 flex items-center gap-2 justify-self-end">
          <div className="cursor-pointer hover:text-brand-500" onClick={print}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
              />
            </svg>
          </div>
          <div className="cursor-pointer hover:text-brand-500" onClick={download}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
        </div>
        <span className="col-start-3 justify-self-center">
          {intl.formatMessage({ id: 'prescription-summary.footer.total-cost' })}
        </span>
        <span className="justify-self-end pr-5">
          {intl.formatNumber(totalCost, {
            style: 'currency',
            currency: currencies[locale],
          })}
        </span>
      </div>
    </div>
  );
}
