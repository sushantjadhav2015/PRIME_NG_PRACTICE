import { Injectable, Type } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  getAds(details: string) {
    return [
      {
        component: ToastComponent,
        inputs: { _severity: 'success', _details:details },
      },
      {
        component: ToastComponent,
        inputs: { _severity: 'error', _details:details },
      },
      {
        component: ToastComponent,
        inputs: { _severity: 'info', _details:details },
      },
      {
        component: ToastComponent,
        inputs: { _severity: 'success', _details:details },
      },
    ] as { component: Type<any>; inputs: Record<string, unknown> }[];
  }
}
