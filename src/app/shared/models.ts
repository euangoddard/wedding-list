export interface Gift {
  name: string;
  section: string;
  description?: string;
  link?: string;
  claimer?: GiftClaimer;
  $key?: string;
}


export interface GiftClaimer {
  name: string;
  email: string;
}


export interface GiftSection {
  name: string;
  gifts: Gift[];
}


export enum DialogCloseButton {
  Ok,
  Cancel,
}