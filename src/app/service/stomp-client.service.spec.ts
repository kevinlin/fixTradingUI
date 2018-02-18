import {inject, TestBed} from '@angular/core/testing';

import {StompClientService} from './stomp-client.service';

describe('StompClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StompClientService]
    });
  });

  it('should be created', inject([StompClientService], (service: StompClientService) => {
    expect(service).toBeTruthy();
  }));
});
