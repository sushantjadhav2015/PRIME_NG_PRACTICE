import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  firstName = signal('sushant')
  lastName = signal('jadhav')

  constructor() { }

  


}
