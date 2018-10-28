import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastOptions } from './toast-options';
import { ToastsManager } from './toasts-manager.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastContainerComponent],
  exports: [ToastContainerComponent],
  entryComponents: [ToastContainerComponent]
})
export class ToastModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [ToastsManager, ToastOptions]
    };
  }
}

