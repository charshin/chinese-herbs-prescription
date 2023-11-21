'use client';

import { memo, useState, useCallback, useEffect, useRef } from 'react';
import type { default as FlowbiteDatePicker, Options } from 'flowbite-datepicker/Datepicker';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import addMinutes from 'date-fns/addMinutes';
import isValid from 'date-fns/isValid';
import type { Locale } from 'date-fns';

import Input from '@/core/components/Input';

declare global {
  interface HTMLElementEventMap {
    changeDate: CustomEvent<{ date: Date }>;
  }
}

interface DatePickerProps {
  /**
   * Label of the control
   */
  label?: string;
  /**
   * Format of date
   */
  pattern: {
    format: {
      input: string;
      output: string;
    };
    locale?: Locale;
  };
  /**
   * Rendered in form or standalone
   */
  standalone?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Value of the date picker
   */
  value: Date | null;
  /**
   * Fired on focus
   */
  onFocus?: () => void;
  /**
   * Fired on value changed
   */
  onChange?: (value: Date | null) => void;
  /**
   * Fired on blur
   */
  onBlur?: () => void;
  /**
   * Disabled
   */
  disabled?: boolean;
  /**
   * Visited
   */
  visited?: boolean;
  /**
   * Touched
   */
  touched?: boolean;
  /**
   * Error
   */
  error?: string;
}

function DatePicker({
  label,
  pattern,
  standalone,
  placeholder,
  value,
  onFocus,
  onChange,
  onBlur,
  disabled,
  visited,
  touched,
  error,
}: DatePickerProps) {
  // Init - Update (CSR & SSR)
  const flowbiteDatePickerEl = useRef<HTMLInputElement>(null);
  const flowbiteDatePicker = useRef<FlowbiteDatePicker | null>(null);
  const flowbiteDatePickerIsUpdatingRef = useRef(false);
  useEffect(() => {
    function getOptions(el: Element) {
      const buttons = el.hasAttribute('datepicker-buttons');
      const autohide = el.hasAttribute('datepicker-autohide');
      const format = el.hasAttribute('datepicker-format');
      const orientation = el.hasAttribute('datepicker-orientation');
      const title = el.hasAttribute('datepicker-title');

      const options: Options = {};
      if (buttons) {
        options.todayBtn = true;
        options.clearBtn = true;
      }
      if (autohide) {
        options.autohide = true;
      }
      if (format) {
        options.format = el.getAttribute('datepicker-format') ?? undefined;
      }
      if (orientation) {
        options.orientation = el.getAttribute('datepicker-orientation') ?? undefined;
      }
      if (title) {
        options.title = el.getAttribute('datepicker-title') ?? undefined;
      }

      return options;
    }
    function discardClick(e: MouseEvent) {
      e.stopPropagation();
    }
    (async () => {
      if (flowbiteDatePickerEl.current === null) return;
      const FlowbiteDatePicker = (await import('flowbite-datepicker/Datepicker')).default;
      flowbiteDatePicker.current = new FlowbiteDatePicker(
        flowbiteDatePickerEl.current,
        getOptions(flowbiteDatePickerEl.current),
      );
      flowbiteDatePicker.current?.pickerElement.addEventListener('click', discardClick);
    })();

    return () => {
      flowbiteDatePicker.current?.pickerElement.removeEventListener('click', discardClick);
    };
  }, []);
  useEffect(() => {
    if (flowbiteDatePickerEl.current && value) {
      try {
        const dateString = format(value, 'dd/MM/yyyy');
        flowbiteDatePickerEl.current.value = dateString;
        flowbiteDatePickerIsUpdatingRef.current = true;
        flowbiteDatePicker.current?.update();
        flowbiteDatePickerIsUpdatingRef.current = false;
      } catch {}
    }
  }, [value]);

  const inputWrapperEl = useRef<HTMLDivElement>(null);

  const formatValue = useCallback(() => {
    if (value === null) return '';
    if (!isValid(value)) return value.toString();
    return format(value, pattern.format.output, { locale: pattern.locale });
  }, [value, pattern.format.output, pattern.locale]);
  const [inputValue, setInputValue] = useState(formatValue);
  useEffect(() => {
    setInputValue(formatValue());
  }, [formatValue]);
  const parseInputValue = useCallback(() => {
    if (inputValue === '') return null;
    return parse(`${inputValue}Z`, `${pattern.format.input}X`, new Date(), {
      locale: pattern.locale,
    });
  }, [inputValue, pattern.format.input, pattern.locale]);
  const commitInputValue = useCallback(() => {
    onChange?.(parseInputValue());
  }, [onChange, parseInputValue]);

  // Enter
  const showPicker = useCallback(() => {
    flowbiteDatePicker.current?.show();
  }, []);
  const handleFocus = useCallback(() => {
    showPicker();
    onFocus?.();
  }, [onFocus, showPicker]);

  // Edit
  useEffect(() => {
    const el = flowbiteDatePickerEl.current;
    function handleChange(e: CustomEvent<{ date: Date }>) {
      if (flowbiteDatePickerIsUpdatingRef.current) return;
      onChange?.(addMinutes(e.detail.date, -new Date().getTimezoneOffset()));
    }
    el?.addEventListener('changeDate', handleChange);

    return () => {
      el?.removeEventListener('changeDate', handleChange);
    };
  }, [onChange, pattern.format.input]);

  // Exit
  const exit = useCallback(() => {
    flowbiteDatePicker.current?.hide();
    setInputValue(formatValue());
    if (visited) onBlur?.(); // Guard against outside click w/o focusing first
  }, [formatValue, visited, onBlur]);
  useEffect(() => {
    const el = inputWrapperEl.current;

    function discardClick(e: MouseEvent) {
      e.stopPropagation();
    }
    el?.addEventListener('click', discardClick);
    document.addEventListener('click', exit);

    function tabAway(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        exit();
      }
    }
    el?.addEventListener('keydown', tabAway);

    return () => {
      el?.removeEventListener('click', discardClick);
      document.removeEventListener('click', exit);

      el?.removeEventListener('keydown', tabAway);
    };
  }, [exit]);

  return (
    <div className="relative">
      <div className="invisible absolute inset-x-0 top-[28px] h-10">
        <input
          ref={flowbiteDatePickerEl}
          datepicker-format="dd/mm/yyyy"
          datepicker-orientation="bottom"
          className="block h-full w-full"
        />
      </div>
      <div ref={inputWrapperEl}>
        <Input
          label={label}
          standalone={standalone}
          leadingAddOn={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
          }
          placeholder={placeholder || pattern.format.input}
          value={inputValue}
          onFocus={handleFocus}
          onChange={setInputValue}
          onEnter={commitInputValue}
          onEscape={exit}
          blurOnEspace
          disabled={disabled}
          touched={touched}
          error={error}
        />
      </div>
    </div>
  );
}

export default memo(DatePicker);
