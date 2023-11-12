'use client';

import type { ChangeEvent } from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
// import { useCurrentLocale } from 'next-i18n-router/client';
// import { useIntl } from 'react-intl';

// import { LOCALES, i18nConfig } from '@/core/config/i18n';

import { uploadFile } from '@/core/actions/uploadFile';

interface PatientFormProps {}

export default function PatientForm({}: PatientFormProps) {
  // const locale = (useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale) as LOCALES;
  // const intl = useIntl();

  const photoEl = useRef<HTMLInputElement>(null);
  const selectPhoto = useCallback(() => {
    photoEl.current?.click();
  }, []);
  const uploadPhoto = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const photo = event.target.files?.[0];
    event.target.value = '';
    if (!photo) return; // TODO Notify
    uploadFile(photo);
  }, []);
  const [isUploadPhotoEnabled, setIsUploadPhotoEnabled] = useState(true);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toUpperCase() === 'U') {
        setIsUploadPhotoEnabled(!isUploadPhotoEnabled);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUploadPhotoEnabled]);

  return (
    <div>
      <input ref={photoEl} type="file" name="herbs" className="hidden" onChange={uploadPhoto} />
      <div
        className={`flex cursor-pointer items-center  text-gray-400 hover:text-brand-500 ${
          isUploadPhotoEnabled ? '' : 'hidden'
        }`}
        onClick={selectPhoto}
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
  );
}
