export interface Gift {
  name: string;
  section: string;
  description?: string;
  link?: string;
  claimer?: GiftClaimer;
}


export interface GiftClaimer {
  name: string;
  email: string;
}


export interface GiftSection {
  name: string;
  gifts: Gift[];
}
