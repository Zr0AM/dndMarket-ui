import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarService);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show message', () => {
    service.show('Test Message');
    expect(service.snackbarState()).toEqual({ message: 'Test Message', duration: 5000 });
  });

  it('should clear existing timeout when showing new message', () => {
    service.show('First Message', 1000);
    expect(service.snackbarState()?.message).toBe('First Message');

    // Show another message before the first one expires
    service.show('Second Message', 2000);
    expect(service.snackbarState()?.message).toBe('Second Message');

    // Advance time past the first message's duration
    jasmine.clock().tick(1000);
    // Should still be showing second message
    expect(service.snackbarState()?.message).toBe('Second Message');

    // Advance time to expire second message
    jasmine.clock().tick(1000);
    expect(service.snackbarState()).toBeNull();
  });

  it('should not set timeout if duration is 0 or less', () => {
    service.show('Permanent Message', 0);
    expect(service.snackbarState()).toEqual({ message: 'Permanent Message', duration: 0 });

    jasmine.clock().tick(10000);
    expect(service.snackbarState()).not.toBeNull();
  });

  it('should hide message after duration', () => {
    service.show('Test Message', 1000);
    expect(service.snackbarState()).toEqual({ message: 'Test Message', duration: 1000 });

    jasmine.clock().tick(1000);

    expect(service.snackbarState()).toBeNull();
  });

  it('should hide message manually', () => {
    service.show('Test Message');
    expect(service.snackbarState()).not.toBeNull();

    service.hide();
    expect(service.snackbarState()).toBeNull();
  });

  it('should clear timeout when hiding manually', () => {
    service.show('Test Message', 1000);
    service.hide();
    expect(service.snackbarState()).toBeNull();

    // Advance time to ensure no errors or state changes occur from the cleared timeout
    jasmine.clock().tick(1000);
    expect(service.snackbarState()).toBeNull();
  });

  it('should hide message without timeout', () => {
    service.show('Permanent', 0);
    service.hide();
    expect(service.snackbarState()).toBeNull();
  });
});
