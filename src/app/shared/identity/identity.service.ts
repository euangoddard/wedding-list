import { Injectable } from '@angular/core';

@Injectable()
export class IdentityService {

  private static KEY = 'identity';

  private identityData: Identity

  constructor() {
    this.identityData = this.load();
  }

  get identity(): Identity {
    return this.identityData;
  }

  set identity(newIdentity: Identity) {
    this.save(newIdentity);
  }

  clearIdentity(): void {
    localStorage.removeItem(IdentityService.KEY);
    this.identityData = null;
  }

  isIdentified(): boolean {
    return this.identityData && hasObjectItems(this.identityData);
  }

  private load(): Identity {
    let valueSerialized = localStorage.getItem(IdentityService.KEY) || '{}';
    return JSON.parse(valueSerialized);
  }

  private save(value: Identity): void {
    let valueSerialized = JSON.stringify(value);
    localStorage.setItem(IdentityService.KEY, valueSerialized);
    this.identityData = value;
  }

}


interface Identity {
  name: string;
  email: string;
}

function hasObjectItems(object: {[key: string]: any}): boolean {
  return Object.getOwnPropertyNames(object).length > 0;
}