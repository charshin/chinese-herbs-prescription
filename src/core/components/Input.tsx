'use client';

import { memo, forwardRef, useState, useRef, useLayoutEffect, useImperativeHandle } from 'react';

interface InputProps {
  /**
   * Label
   */
  label?: string;
  /**
   * Rendered in form or standalone
   */
  standalone?: boolean;
  /**
   * Leading add-on of the input
   */
  leadingAddOn?: React.ReactNode;
  /**
   * Trailing add-on of the input
   */
  trailingAddOn?: React.ReactNode;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Value of the input
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
   * Fired on Enter
   */
  onEnter?: (value: string) => void;
  /**
   * Blur on Enter
   */
  blurOnEnter?: boolean;
  /**
   * Fired on Escape
   */
  onEscape?: () => void;
  /**
   * Blur on Escape
   */
  blurOnEspace?: boolean;
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

export const Input = forwardRef<{ blur: () => void }, InputProps>(function Input(
  {
    label,
    standalone,
    leadingAddOn,
    trailingAddOn,
    placeholder,
    value,
    onFocus,
    onChange,
    onBlur,
    onEnter,
    blurOnEnter,
    onEscape,
    blurOnEspace,
    disabled,
    touched,
    error,
  },
  ref,
) {
  const id = label?.split(' ').join('-');

  const leadingAddOnEl = useRef<HTMLDivElement>(null);
  const [leadingAddOnPadding, setLeadingAddOnPadding] = useState(0);
  useLayoutEffect(() => {
    setLeadingAddOnPadding((leadingAddOnEl.current?.offsetWidth || 0) + 8);
  }, [leadingAddOn]);

  const trailingAddOnEl = useRef<HTMLDivElement>(null);
  const [trailingAddOnPadding, setTrailingAddOnPadding] = useState(0);
  useLayoutEffect(() => {
    setTrailingAddOnPadding((trailingAddOnEl.current?.offsetWidth || 0) + 5);
  }, [trailingAddOn]);

  const inputEl = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      blur() {
        inputEl.current?.blur();
      },
    }),
    [],
  );
  useLayoutEffect(() => {
    inputEl.current?.setCustomValidity((touched && error) || '');
  }, [touched, error]);

  // TODO Consider using fieldset and legend, apply to other controls too
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
      <div className="relative h-10 w-full shadow-sm">
        {leadingAddOn && (
          <div
            ref={leadingAddOnEl}
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <span
              className={`sm:text-sm${
                !disabled && !(touched && error) ? ' text-gray-500 dark:text-gray-400' : ''
              }${disabled ? ' text-slate-400 dark:text-gray-300' : ''}${
                touched && error ? ' text-red-600 dark:text-red-500' : ''
              }`}
            >
              {leadingAddOn}
            </span>
          </div>
        )}
        <input
          ref={inputEl}
          id={id}
          type="text"
          name={id}
          className="block h-full w-full rounded-md border-0 bg-gray-50 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:bg-red-50 invalid:text-red-900 invalid:placeholder-red-400 invalid:ring-red-500 focus:ring-2 focus:ring-inset focus:ring-brand-600 focus:invalid:ring-red-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:ring-gray-600 dark:invalid:text-red-500 dark:invalid:placeholder-red-400 dark:invalid:ring-red-500 dark:focus:ring-brand-500 dark:focus:invalid:ring-red-500 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 dark:disabled:ring-gray-500 sm:text-sm sm:leading-6"
          style={{
            paddingLeft: leadingAddOn ? leadingAddOnPadding : undefined,
            paddingRight: trailingAddOn ? trailingAddOnPadding : undefined,
          }}
          placeholder={placeholder}
          value={value}
          onFocus={onFocus}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter?.(e.currentTarget.value);
              if (blurOnEnter) {
                inputEl.current?.blur();
              }
            }
            if (e.key === 'Escape') {
              onEscape?.();
              if (blurOnEspace) {
                inputEl.current?.blur();
              }
            }
          }}
          disabled={disabled}
        />
        {trailingAddOn && (
          <div
            ref={trailingAddOnEl}
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <span
              className={`sm:text-sm${
                !disabled && !(touched && error) ? ' text-gray-500 dark:text-gray-400' : ''
              }${disabled ? ' text-slate-400 dark:text-gray-300' : ''}${
                touched && error ? ' text-red-600 dark:text-red-500' : ''
              }`}
            >
              {trailingAddOn}
            </span>
          </div>
        )}
      </div>
      <p
        className={`mt-2 text-red-600 opacity-0 transition-opacity dark:text-red-500 sm:text-sm${
          touched && error ? ' opacity-100' : standalone ? ' hidden' : ''
        }`}
      >
        {error}
      </p>
    </div>
  );
});

export default memo(Input);
