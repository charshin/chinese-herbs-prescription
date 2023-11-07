'use client';

import type { FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { LOCALES, i18nConfig } from '@/core/config/i18n';
import { HerbSchema } from '@/core/types/schemas/herb';
import { HerbModel } from '@/core/types/models/herb';
import { HERB_PHOTO_ALT_TEXT, BLUR_DATA_URL } from '@/core/config/constants';
import { convertHerbDTOtoModel } from '@/core/utils/data';
import HerbPhoto from '@/core/assets/img/ty-ba-diep.jpeg';

import { uploadHerbsData } from '../actions/uploadHerbsData';

export interface Prescribable {
  prescribed?: boolean;
}

interface Filterable {
  filtered?: boolean;
}

interface PickHerbsProps {
  /**
   * Label of the picker
   */
  label?: string;
  /**
   * Herbs with prescribed status
   */
  herbs: (HerbModel & Prescribable)[];
  /**
   * Fired on herbs picked or unpicked
   */
  onPickChange?: (herbs: (HerbModel & Prescribable)[]) => void;
}

export default function PickHerbs({ herbs, onPickChange }: PickHerbsProps) {
  const locale = (useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale) as LOCALES;
  const intl = useIntl();

  const [filteredHerbs, setFilteredHerbs] =
    useState<(HerbModel & Prescribable & Filterable)[]>(herbs);
  const keywordRef = useRef('');
  const filter = useCallback(
    (herbs: HerbModel[], keyword?: string) => {
      const regex = new RegExp((keywordRef.current = keyword ?? keywordRef.current), 'i');
      const newFilteredHerbs = herbs.map((herb) => ({
        ...herb,
        filtered: !regex.test(herb.displayedIn[locale]),
      }));
      setFilteredHerbs(newFilteredHerbs);
    },
    [locale],
  );
  const handleKeywordChange = useCallback(
    ({ currentTarget: { value: keyword } }: FormEvent<HTMLInputElement>) => {
      filter(herbs, keyword);
    },
    [filter, herbs],
  );
  useEffect(() => {
    filter(herbs);
  }, [filter, herbs]);

  const pick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const newHerbs = herbs.map((herb) =>
        herb.name === event.currentTarget.dataset.herbName
          ? { ...herb, prescribed: !herb.prescribed }
          : herb,
      );
      onPickChange?.(newHerbs);
    },
    [herbs, onPickChange],
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const selectFile = useCallback(() => {
    fileRef.current?.click();
  }, []);
  const uploadFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
      const data = JSON.parse(event.target?.result as string);
      const result = z.array(HerbSchema).safeParse(data);
      if (result.success) {
        uploadHerbsData(result.data.map(convertHerbDTOtoModel)); // TODO Take care of this
      }
    });
    reader.readAsText(file);
  }, []);
  const [isUploadFileEnabled, setIsUploadFileEnabled] = useState(true);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'u') {
        setIsUploadFileEnabled(!isUploadFileEnabled);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUploadFileEnabled]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative shadow-sm">
        <input
          type="text"
          className={`block w-full rounded-md border-0 py-1.5 ${
            isUploadFileEnabled ? 'pr-8' : ''
          } text-gray-900 ring-1 ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6`}
          placeholder={intl.formatMessage({ id: 'pick-herbs.filter.placeholder' })}
          onChange={handleKeywordChange}
        />
        <input ref={fileRef} type="file" name="herbs" className="hidden" onChange={uploadFile} />
        <div
          className={`absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 text-gray-400 hover:text-brand-500 ${
            isUploadFileEnabled ? '' : 'hidden'
          }`}
          onClick={selectFile}
        >
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      </div>
      <div className="overflow-auto rounded-md bg-white py-2 text-sm shadow-lg ring-1 ring-slate-500">
        {filteredHerbs.every((herb) => herb.filtered) ? (
          <p className="cursor-default py-1 pl-2 pr-4 font-light">No results!</p>
        ) : (
          filteredHerbs
            .filter((herb) => !herb.filtered)
            .map((herb) => (
              <div
                key={herb.name}
                data-herb-name={herb.name}
                className="flex cursor-pointer items-center gap-2 pl-2 pr-4 hover:bg-brand-700 hover:text-white"
                onClick={pick}
              >
                <div className="h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={HerbPhoto}
                    alt={HERB_PHOTO_ALT_TEXT}
                    // width={20}
                    // height={20}
                    // blurDataURL={poster ? BLUR_DATA_URL : undefined}
                    // blurDataURL={BLUR_DATA_URL}
                    // placeholder="blur"
                  />
                </div>
                <span className="py-1 font-light">{herb.displayedIn[locale]}</span>
                <div
                  className={`ml-auto ${
                    herb.prescribed ? 'opacity-100' : 'opacity-0'
                  } transition-opacity`}
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
