import { ToastModule } from './toast-module';

describe('ToastModule', () => {
  let toastModuleModule: ToastModule;

  beforeEach(() => {
    toastModuleModule = new ToastModule();
  });

  it('should create an instance', () => {
    expect(toastModuleModule).toBeTruthy();
  });
});
