'use client';

import { useCallback, useMemo } from 'react';
// import { useCurrentLocale } from 'next-i18n-router/client';
// import { useIntl } from 'react-intl';
import { Form, Field } from 'react-final-form';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

// import { LOCALES, i18nConfig } from '@/core/config/i18n';
import Input from '@/core/components/Input';
import DatePicker from '@/core/components/DatePicker';
import RadioGroup from '@/core/components/RadioGroup';
import TextArea from '@/core/components/TextArea';

interface PatientFormProps {}

interface FormValues {
  fullname?: string;
  dob?: Date;
}

export default function PatientForm({}: PatientFormProps) {
  // const locale = (useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale) as LOCALES;
  // const intl = useIntl();

  const initialValues = useMemo(
    () => ({
      gender: {
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
    }),
    [],
  );
  const pattern = useMemo(
    () => ({
      format: {
        input: 'dd/MM/yyyy',
        output: 'do MMM yyyy',
      },
      locale: undefined, // TODO Load this dynamically based on locale
    }),
    [],
  );
  const submit = useCallback((values: FormValues) => {
    alert(JSON.stringify(values));
  }, []);

  return (
    <Form initialValues={initialValues} onSubmit={submit}>
      {({ form, handleSubmit }) => (
        <form className="w-full max-w-2xl space-y-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="col-span-full sm:col-span-2">
              <Field name="fullname">
                {({ input, meta }) => (
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field
                name="dob"
                format={(value) => {
                  try {
                    return format(value, pattern.format.output, { locale: pattern.locale });
                  } catch {
                    return '';
                  }
                }}
                parse={(value) => {
                  return parse(value, pattern.format.input, new Date(), { locale: pattern.locale });
                }}
              >
                {({ input, meta }) => (
                  <DatePicker
                    label="Date of Birth"
                    pattern={pattern}
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field name="email">
                {({ input, meta }) => (
                  <Input
                    label="Email"
                    leadingAddOn={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    }
                    placeholder="john.smith@gmail.com"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field name="phone">
                {({ input, meta }) => (
                  <Input
                    label="Phone"
                    leadingAddOn={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    placeholder="0901234567"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field name="gender">
                {({ input, meta }) => (
                  <RadioGroup label="Gender" {...input} {...meta} disabled={meta.submitting} />
                )}
              </Field>
            </div>
            <div className="col-span-full sm:col-span-2">
              <Field name="occupation">
                {({ input, meta }) => (
                  <Input
                    label="Occupation"
                    leadingAddOn={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                      </svg>
                    }
                    placeholder="Fullstack Developer"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-1">
              <Field name="height">
                {({ input, meta }) => (
                  <Input
                    label="Height"
                    trailingAddOn="cm"
                    placeholder="170"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-1">
              <Field name="weight">
                {({ input, meta }) => (
                  <Input
                    label="Weight"
                    trailingAddOn="kg"
                    placeholder="65"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-1">
              <Field name="bloodPressure">
                {({ input, meta }) => (
                  <Input
                    label="Blood Pressure"
                    trailingAddOn="mmHg"
                    placeholder="110/70"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-1">
              <Field name="heartRate">
                {({ input, meta }) => (
                  <Input
                    label="Heart Rate"
                    trailingAddOn="bpm"
                    placeholder="60"
                    {...input}
                    {...meta}
                    disabled={meta.submitting}
                  />
                )}
              </Field>
            </div>
            <div className="col-span-full">
              <Field name="address">
                {({ input, meta }) => (
                  <TextArea label="Address" {...input} {...meta} disabled={meta.submitting} />
                )}
              </Field>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            <div className="col-span-full sm:col-span-1">
              <button
                type="button"
                className="mb-2 me-2 w-full rounded-md bg-gradient-to-r from-brand-500 to-blue-500 px-5 py-2.5 text-center font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-brand-300 disabled:cursor-not-allowed disabled:from-slate-500 disabled:to-gray-500 dark:focus:ring-brand-800 sm:text-sm"
                onClick={handleSubmit}
                disabled={form.getState().pristine || form.getState().invalid}
              >
                Submit
              </button>
            </div>
            <div className="col-span-full sm:col-span-1">
              <button
                type="button"
                className="mb-2 me-2 w-full rounded-md bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:cursor-not-allowed disabled:from-slate-500 disabled:to-gray-500 dark:focus:ring-pink-800 sm:text-sm"
                disabled={form.getState().pristine}
                onClick={() => form.restart()}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}
