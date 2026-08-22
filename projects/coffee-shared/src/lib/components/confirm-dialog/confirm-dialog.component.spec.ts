import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, IConfirmDialogData } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef: any;
  const mockData: IConfirmDialogData = {
    title: 'Confirm Action',
    message: 'Are you sure?',
    confirmText: 'Yes',
    cancelText: 'No',
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: vi.fn(),
      dismiss: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const titleElement = fixture.debugElement.nativeElement.querySelector('h2');
    expect(titleElement?.textContent).toContain('Confirm Action');
  });

  it('should display message', () => {
    const messageElement = fixture.debugElement.nativeElement.querySelector('mat-dialog-content');
    expect(messageElement?.textContent).toContain('Are you sure?');
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const confirmButton = fixture.debugElement.nativeElement.querySelector(
      'button[mat-raised-button]',
    ) as HTMLButtonElement;

    confirmButton.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onCancel when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.nativeElement.querySelector(
      'button[mat-button]',
    ) as HTMLButtonElement;

    cancelButton.click();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should use custom button texts', () => {
    const confirmButton = fixture.debugElement.nativeElement.querySelector(
      'button[mat-raised-button]',
    ) as HTMLButtonElement;
    const cancelButton = fixture.debugElement.nativeElement.querySelector(
      'button[mat-button]',
    ) as HTMLButtonElement;

    expect(confirmButton?.textContent).toContain('Yes');
    expect(cancelButton?.textContent).toContain('No');
  });

  it('should handle onConfirm with true value', () => {
    component.onConfirm();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should handle onCancel with false value', () => {
    component.onCancel();

    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
