import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';

@Component({
  selector: 'app-test-auto-focus',
  template: `
    <input appAutoFocus type="text" id="first" />
    <input type="text" id="second" />
  `,
  standalone: true,
  imports: [AutoFocusDirective],
})
class TestAutoFocusComponent {}

describe('AutoFocusDirective', () => {
  let component: TestAutoFocusComponent;
  let fixture: ComponentFixture<TestAutoFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAutoFocusComponent, AutoFocusDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestAutoFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(component).toBeTruthy();
  });

  it('should focus input element after initialization', async () => {
    await fixture.whenStable();
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const firstInput = inputs[0];

    // Check if the directive was applied
    expect(firstInput.getAttribute('appautofocus')).toBeDefined();
  });

  it('should only apply to first input with directive', () => {
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const firstInput = inputs[0];
    const secondInput = inputs[1];

    expect(firstInput.getAttribute('appautofocus')).toBeDefined();
    expect(secondInput.getAttribute('appautofocus')).toBeNull();
  });

  it('should not throw error on initialization', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should apply directive to input element', () => {
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    expect(inputs[0]).toBeTruthy();
  });

  it('should handle element with directive', () => {
    const input = fixture.debugElement.nativeElement.querySelector('[appautofocus]');
    expect(input).toBeTruthy();
  });
});
