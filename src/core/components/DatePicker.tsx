'use client';

import { useCallback, useEffect } from 'react';

export default function DatePicker() {
  const initDatepickers = useCallback(async () => {
    const getDatepickerOptions = (datepickerEl: Element) => {
      const buttons = datepickerEl.hasAttribute('datepicker-buttons');
      const autohide = datepickerEl.hasAttribute('datepicker-autohide');
      const format = datepickerEl.hasAttribute('datepicker-format');
      const orientation = datepickerEl.hasAttribute('datepicker-orientation');
      const title = datepickerEl.hasAttribute('datepicker-title');

      const options = {};
      if (buttons) {
        options.todayBtn = true;
        options.clearBtn = true;
      }
      if (autohide) {
        options.autohide = true;
      }
      if (format) {
        options.format = datepickerEl.getAttribute('datepicker-format');
      }
      if (orientation) {
        options.orientation = datepickerEl.getAttribute('datepicker-orientation');
      }
      if (title) {
        options.title = datepickerEl.getAttribute('datepicker-title');
      }

      return options;
    };

    const datepickers = document.querySelectorAll('[type=datepicker]');
    const inlineDatepickers = document.querySelectorAll('[type=inline-datepicker]');
    if (datepickers.length > 0 || inlineDatepickers.length > 0) {
      const Datepicker = (await import('flowbite-datepicker/Datepicker')).default;
      datepickers.forEach((el) => new Datepicker(el, getDatepickerOptions(el)));
      inlineDatepickers.forEach((el) => new Datepicker(el, getDatepickerOptions(el)));
    }

    const dateRangePickers = document.querySelectorAll('[type=date-rangepicker]');
    if (dateRangePickers.length > 0) {
      const DateRangePicker = (await import('flowbite-datepicker/DateRangePicker')).default;
      dateRangePickers.forEach((el) => new DateRangePicker(el, getDatepickerOptions(el)));
    }
  }, []);

  useEffect(() => {
    initDatepickers();
  }, [initDatepickers]);

  return (
    <div className="relative max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>
      <input
        type="datepicker"
        datepicker-format="dd/mm/yyyy"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Select date"
      />
    </div>
  );
}
