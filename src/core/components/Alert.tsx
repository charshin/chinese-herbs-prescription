'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';

import { ClientSideAppRenderPhase, useClientSideAppRenderPhase } from '@/core/utils/render';
import { AnimatePresence, MotionLi } from '@/core/lib/motion';

export interface Alert {
  type: 'success' | 'error' | 'warning' | 'danger' | 'info';
  content: React.ReactNode;
  autoDismiss?: false;
  autoDismissDelay?: number;
}

interface AutoDismissCancellable {
  autoDismissTimeoutId?: ReturnType<typeof setTimeout>;
}

interface ContextValue {
  notify: (alert: Alert) => Identifiable;
  dismiss: (alert: Identifiable) => void;
}

const AUTO_DISMISS_DEFAULT_DELAY = 3000;
const AlertSystemContext = createContext<ContextValue | null>(null);

export function useAlert() {
  const { notify } = useContext(AlertSystemContext)!;
  return { notify };
}

export default function AlertSystem({ children }: { children: React.ReactNode }) {
  const phase = useClientSideAppRenderPhase();

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const alertsRef = useRef<(Alert & Identifiable & AutoDismissCancellable)[]>([]);
  const dismiss = useCallback(({ id }: Identifiable) => {
    const idx = alertsRef.current.findIndex((v) => v.id === id);
    if (idx >= 0) {
      alertsRef.current.splice(idx, 1);
      forceUpdate();
    }
  }, []);
  const startAutoDismiss = useCallback(
    ({ id }: Identifiable) => {
      const alert = alertsRef.current.find((v) => v.id === id);
      if (alert && (alert.autoDismiss ?? true)) {
        alert.autoDismissTimeoutId = setTimeout(
          () => dismiss({ id }),
          alert.autoDismissDelay ?? AUTO_DISMISS_DEFAULT_DELAY,
        );
      }
    },
    [dismiss],
  );
  const cancelAutoDismiss = useCallback(({ id }: Identifiable) => {
    clearTimeout(alertsRef.current.find((v) => v.id === id)?.autoDismissTimeoutId);
  }, []);
  const notify = useCallback(
    (alert: Alert) => {
      alertsRef.current.unshift({ ...alert, id: nanoid(5) });
      startAutoDismiss({ id: alertsRef.current[0].id });
      forceUpdate();
      return { id: alertsRef.current[0].id };
    },
    [startAutoDismiss],
  );

  const contextValue = useMemo<ContextValue>(
    () => ({
      notify,
      dismiss,
    }),
    [notify, dismiss],
  );

  return phase >= ClientSideAppRenderPhase.CSR_Rerender_Hydrated ? (
    <AlertSystemContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="absolute inset-x-0 top-10">
          <ul className="flex flex-col items-center gap-2">
            <AnimatePresence>
              {alertsRef.current.map(({ id, type, content }) => (
                <MotionLi
                  key={id}
                  layout
                  initial={{ opacity: 0, translateY: '-120%' }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    layout: { duration: 0.25 },
                    translateY: { duration: 0.25 },
                    opacity: { duration: 0.25 },
                  }}
                  className={`relative z-50 flex w-fit min-w-[30vw] max-w-lg items-center rounded-md p-4 shadow-sm ring-1 ring-inset dark:bg-gray-800 sm:text-sm${
                    type === 'success'
                      ? ' bg-green-50 text-green-800 ring-green-500 dark:text-green-400 dark:ring-green-400'
                      : ''
                  }${
                    type === 'error'
                      ? ' bg-red-50 text-red-800 ring-red-500 dark:text-red-400 dark:ring-red-400'
                      : ''
                  }${
                    type === 'warning'
                      ? ' bg-yellow-50 text-yellow-800 ring-yellow-500 dark:text-yellow-400 dark:ring-yellow-400'
                      : ''
                  }${
                    type === 'danger'
                      ? ' bg-red-50 text-red-800 ring-red-500 dark:text-red-400 dark:ring-red-400'
                      : ''
                  }${
                    type === 'info'
                      ? ' bg-brand-50 text-brand-800 ring-brand-500 dark:text-brand-400 dark:ring-brand-400'
                      : ''
                  }`}
                  onMouseEnter={() => cancelAutoDismiss({ id })}
                  onMouseLeave={() => startAutoDismiss({ id })}
                >
                  {content}
                  <button
                    type="button"
                    className={`-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-md p-1.5 focus:ring-2 dark:bg-gray-800 dark:hover:bg-gray-700${
                      type === 'success'
                        ? ' bg-green-50 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:text-green-400'
                        : ''
                    }${
                      type === 'error'
                        ? ' bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:text-red-400'
                        : ''
                    }${
                      type === 'warning'
                        ? ' bg-yellow-50 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:text-yellow-400'
                        : ''
                    }${
                      type === 'danger'
                        ? ' bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:text-red-400'
                        : ''
                    }${
                      type === 'info'
                        ? ' bg-brand-50 text-brand-500 hover:bg-brand-200 focus:ring-brand-400 dark:text-brand-400'
                        : ''
                    }`}
                    aria-label="Close"
                    onClick={() => dismiss({ id })}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </MotionLi>
              ))}
            </AnimatePresence>
          </ul>
        </div>,
        document.body,
      )}
    </AlertSystemContext.Provider>
  ) : null;
}
