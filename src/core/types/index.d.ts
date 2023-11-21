interface Identifiable {
  id: number;
}

declare module 'flowbite-datepicker/Datepicker' {
  export default class Datepicker {
    constructor(element: HTMLInputElement, options: Datepicker.Options);
    show(): void;
    hide(): void;
    update(): void;
    get pickerElement(): HTMLDivElement;
  }

  export interface Options {
    todayBtn?: boolean;
    clearBtn?: boolean;
    autohide?: boolean;
    format?: string;
    orientation?: string;
    title?: string;
  }
}
