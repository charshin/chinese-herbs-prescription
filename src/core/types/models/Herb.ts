export interface HerbModel {
  name: string;
  photo?: string;
  traits?: string[];
  price: number;
  displayedIn: Record<string, string>;
}
