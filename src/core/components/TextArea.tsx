'use client';

import { memo, useRef, useLayoutEffect } from 'react';

interface TextAreaProps {
  /**
   * Label
   */
  label?: string;
  /**
   * Rendered in form or standalone
   */
  standalone?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Value
   */
  value?: string;
  /**
   * Fired on focus
   */
  onFocus?: () => void;
  /**
   * Fired on value changed
   */
  onChange?: (value: string) => void;
  /**
   * Fired on blur
   */
  onBlur?: () => void;
  /**
   * Disabled
   */
  disabled?: boolean;
  /**
   * Touched
   */
  touched?: boolean;
  /**
   * Error
   */
  error?: string;
}

function TextArea({
  label,
  standalone,
  placeholder,
  value,
  onFocus,
  onChange,
  onBlur,
  disabled,
  touched,
  error,
}: TextAreaProps) {
  const id = label?.split(' ').join('-');

  const textareaEl = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    textareaEl.current?.setCustomValidity((touched && error) || '');
  }, [touched, error]);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`mb-2 block font-medium leading-6 sm:text-sm${
          label ? '' : standalone ? ' hidden' : ' invisible'
        }${!disabled && !(touched && error) ? ' text-gray-900 dark:text-white' : ''}${
          disabled ? ' text-slate-500 dark:text-gray-500' : ''
        }${touched && error ? ' text-red-600 dark:text-red-500' : ''}`}
      >
        {label || 'Label'}
      </label>
      <textarea
        ref={textareaEl}
        id={id}
        rows={2}
        className="block h-full w-full rounded-md border-0 bg-gray-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:bg-red-50 invalid:text-red-900 invalid:placeholder-red-400 invalid:ring-red-500 focus:ring-2 focus:ring-inset focus:ring-brand-600 focus:invalid:ring-red-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:ring-gray-600 dark:invalid:text-red-500 dark:invalid:placeholder-red-400 dark:invalid:ring-red-500 dark:focus:ring-brand-500 dark:focus:invalid:ring-red-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 dark:disabled:ring-gray-500 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
      />
      <p
        className={`mt-2 text-red-600 opacity-0 transition-opacity dark:text-red-500 sm:text-sm${
          touched && error ? ' opacity-100' : standalone ? ' hidden' : ''
        }`}
      >
        {error}
      </p>
    </div>
  );
}

export default memo(TextArea);
