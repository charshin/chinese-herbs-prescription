'use client';

import { memo } from 'react';

export interface RadioGroupValue {
  options: { value: string; label: string }[];
  selected?: string;
}

interface RadioGroupProps {
  /**
   * Name of the radio group
   */
  name: string;
  /**
   * Label
   */
  label?: string;
  /**
   * Rendered in form or standalone
   */
  standalone?: boolean;
  /**
   * Value of the input
   */
  value: RadioGroupValue;
  /**
   * Fired on focus
   */
  onFocus?: () => void;
  /**
   * Fired on value changed
   */
  onChange?: (value: RadioGroupValue) => void;
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

function RadioGroup({
  name,
  label,
  standalone,
  value,
  onFocus,
  onChange,
  onBlur,
  disabled,
  touched,
  error,
}: RadioGroupProps) {
  const id = label?.split(' ').join('-');

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`mb-2 block whitespace-pre font-medium leading-6 sm:text-sm${
          label ? '' : standalone ? ' hidden' : ' invisible'
        }${!disabled && !(touched && error) ? ' text-gray-900 dark:text-white' : ''}${
          disabled ? ' text-slate-500 dark:text-gray-500' : ''
        }${touched && error ? ' text-red-600 dark:text-red-500' : ''}`}
      >
        {label || ' '}
      </label>
      <ul
        className={`w-full rounded-md border-0 font-medium text-gray-900 shadow-sm ring-1 ring-inset dark:text-white sm:flex sm:items-center sm:text-sm${
          !disabled && !(touched && error) ? ' ring-gray-300' : ' dark:ring-gray-500'
        }${
          disabled
            ? ' bg-gray-100 ring-gray-300 dark:bg-gray-600 dark:ring-gray-500'
            : ' bg-white dark:bg-gray-700 dark:ring-gray-600'
        }${touched && error ? ' ring-red-500 dark:ring-red-500' : ''}`}
      >
        {value.options.map((opt) => (
          <li
            key={opt.value}
            className={`h-10 w-full border-b last:border-none sm:border-b-0 sm:border-r${
              !disabled && !(touched && error) ? ' border-gray-200 dark:border-gray-600' : ''
            }${disabled ? ' border-gray-300 dark:border-gray-500' : ''}${
              touched && error ? ' border-red-500 dark:border-red-500' : ''
            }`}
          >
            <div className="flex h-full items-center ps-3">
              <input
                id={opt.value}
                type="radio"
                name={name}
                value={opt.value}
                checked={opt.value === value.selected}
                className={`h-4 w-4 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-brand-600 dark:focus:ring-offset-gray-700${
                  touched && error
                    ? ' border-red-900 dark:border-red-500'
                    : ' border-gray-300 dark:border-gray-500'
                }`}
                onFocus={onFocus}
                onChange={(e) => onChange?.({ ...value, selected: e.target.value })}
                onBlur={onBlur}
                disabled={disabled}
              />
              <label
                htmlFor={opt.value}
                className={`ms-2 flex h-full w-full items-center font-medium sm:text-sm${
                  !disabled && !(touched && error) ? ' text-gray-900 dark:text-gray-300' : ''
                }${disabled ? ' text-slate-500 dark:text-gray-400' : ''}${
                  touched && error ? ' text-red-900 dark:text-red-500' : ''
                }`}
              >
                {opt.label}
              </label>
            </div>
          </li>
        ))}

        {/* <li
          className={`h-10 w-full border-b sm:border-b-0 sm:border-r${
            !disabled && !(touched && error) ? ' border-gray-200 dark:border-gray-600' : ''
          }${disabled ? ' border-gray-300 dark:border-gray-500' : ''}${
            touched && error ? ' border-red-500 dark:border-red-500' : ''
          }`}
        >
          <div className="flex h-full items-center ps-3">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value=""
              name="list-radio"
              className={`h-4 w-4 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-brand-600 dark:focus:ring-offset-gray-700${
                touched && error
                  ? ' border-red-900 dark:border-red-500'
                  : ' border-gray-300 dark:border-gray-500'
              }`}
              // disabled={disabled}
            />
            <label
              htmlFor="horizontal-list-radio-id"
              className={`ms-2 flex h-full w-full items-center font-medium sm:text-sm${
                !disabled && !(touched && error) ? ' text-gray-900 dark:text-gray-300' : ''
              }${disabled ? ' text-slate-500 dark:text-gray-400' : ''}${
                touched && error ? ' text-red-900 dark:text-red-500' : ''
              }`}
            >
              State
            </label>
          </div>
        </li>
        <li className="h-10 w-full">
          <div className="flex h-full items-center ps-3">
            <input
              id="horizontal-list-radio-passport"
              type="radio"
              value=""
              name="list-radio"
              className={`h-4 w-4 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-brand-600 dark:focus:ring-offset-gray-700${
                touched && error
                  ? ' border-red-900 dark:border-red-500'
                  : ' border-gray-300 dark:border-gray-500'
              }`}
              disabled={disabled}
            />
            <label
              htmlFor="horizontal-list-radio-passport"
              className={`ms-2 flex h-full w-full items-center font-medium sm:text-sm${
                !disabled && !(touched && error) ? ' text-gray-900 dark:text-gray-300' : ''
              }${disabled ? ' text-slate-500 dark:text-gray-400' : ''}${
                touched && error ? ' text-red-900 dark:text-red-500' : ''
              }`}
            >
              Female
            </label>
          </div>
        </li> */}
      </ul>
      <p
        className={`mt-2 whitespace-pre text-red-600 opacity-0 transition-opacity dark:text-red-500 sm:text-sm${
          touched && error ? ' opacity-100' : standalone ? ' hidden' : ''
        }`}
      >
        {error || ' '}
      </p>
    </div>
  );
}

export default memo(RadioGroup);
