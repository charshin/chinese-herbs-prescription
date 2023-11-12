'use client';

import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { forwardRef, useState, useRef, useLayoutEffect, useCallback } from 'react';

interface InputProps {
  /**
   * Input type should be text or number
   */
  type?: 'text' | 'number';
  /**
   * Label of the input
   */
  label?: string;
  /**
   * Leading add-on of the input
   */
  leadingAddOn?: string;
  /**
   * Trailing add-on of the input
   */
  trailingAddOn?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Value of the input
   */
  value?: string;
  /**
   * Fired on value changed
   */
  onChange?: (value: string) => void;
  /**
   * Fired on blur
   */
  onBlur?: (value: string) => void;
  /**
   * Fired on Enter
   */
  onEnter?: (value: string) => void;
  /**
   * Fired on Escape
   */
  onEscape?: () => void;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    label,
    leadingAddOn,
    trailingAddOn,
    placeholder,
    value,
    onChange,
    onBlur,
    onEnter,
    onEscape,
  },
  ref,
) {
  const leadingAddOnEl = useRef<HTMLDivElement>(null);
  const [leadingAddOnPadding, setLeadingAddOnPadding] = useState(0);
  useLayoutEffect(() => {
    setLeadingAddOnPadding((leadingAddOnEl.current?.offsetWidth || 0) + 5);
  }, [leadingAddOn]);

  const trailingAddOnEl = useRef<HTMLDivElement>(null);
  const [trailingAddOnPadding, setTrailingAddOnPadding] = useState(0);
  useLayoutEffect(() => {
    setTrailingAddOnPadding((trailingAddOnEl.current?.offsetWidth || 0) + 5);
  }, [trailingAddOn]);

  const id = label?.split(' ').join('-');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange],
  );
  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event.target.value);
    },
    [onBlur],
  );
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnter?.(event.currentTarget.value);
      }
      if (event.key === 'Escape') {
        onEscape?.();
      }
    },
    [onEnter, onEscape],
  );

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600">
        {leadingAddOn && (
          <div
            ref={leadingAddOnEl}
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <span className="text-gray-500 sm:text-sm">{leadingAddOn}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          name={id}
          id={id}
          className="block h-full w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          style={{
            paddingLeft: leadingAddOn && leadingAddOnPadding,
            paddingRight: trailingAddOn && trailingAddOnPadding,
          }}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {trailingAddOn && (
          <div
            ref={trailingAddOnEl}
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <span className="text-gray-500 sm:text-sm">{trailingAddOn}</span>
          </div>
        )}
      </div>
    </div>
  );
});
