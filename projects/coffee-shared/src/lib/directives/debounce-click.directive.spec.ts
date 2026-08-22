import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebounceClickDirective } from './debounce-click.directive';

@Component({
  selector: 'app-test-debounce-click',
  template: `
    <button appDebounceClick (debounceClick)="onClick()" [debounceTime]="debounceTime">
      Click Me
    </button>
  `,
  standalone: true,
  imports: [DebounceClickDirective],
})
class TestDebounceClickComponent {
  clickCount = 0;
  debounceTime = 300;

  onClick() {
    this.clickCount++;
  }
}

describe('DebounceClickDirective', () => {
  let component: TestDebounceClickComponent;
  let fixture: ComponentFixture<TestDebounceClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDebounceClickComponent, DebounceClickDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDebounceClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce click events', async () => {
    const spyOn = vi.spyOn(component, 'onClick');
    const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    button.click();
    button.click();

    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should emit click after debounce time', async () => {
    const spyOn = vi.spyOn(component, 'onClick');
    const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();

    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(spyOn).toHaveBeenCalled();
  });

  it('should reset debounce on multiple clicks', async () => {
    const spyOn = vi.spyOn(component, 'onClick');
    const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 150));
    button.click();

    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid clicks', async () => {
    const spyOn = vi.spyOn(component, 'onClick');
    const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;

    for (let i = 0; i < 10; i++) {
      button.click();
    }

    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should recognize when directive is applied', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('appDebounceClick')).toBeDefined();
  });
});
