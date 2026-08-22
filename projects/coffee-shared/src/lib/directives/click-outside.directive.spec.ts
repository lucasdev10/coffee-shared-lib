import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'app-test-click-outside',
  template: `
    <div appClickOutside (clickOutside)="onClickOutside()">
      <button id="inside-btn">Inside</button>
    </div>
    <button id="outside-btn">Outside</button>
  `,
  standalone: true,
  imports: [ClickOutsideDirective],
})
class TestClickOutsideComponent {
  clickOutsideCalled = false;

  onClickOutside() {
    this.clickOutsideCalled = true;
  }
}

describe('ClickOutsideDirective', () => {
  let component: TestClickOutsideComponent;
  let fixture: ComponentFixture<TestClickOutsideComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestClickOutsideComponent, ClickOutsideDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestClickOutsideComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickOutside when clicking outside', () => {
    const spyOn = vi.spyOn(component, 'onClickOutside');
    const outsideBtn = fixture.debugElement.nativeElement.querySelector('#outside-btn') as HTMLButtonElement;

    outsideBtn.click();

    expect(spyOn).toHaveBeenCalled();
  });

  it('should not emit clickOutside when clicking inside', () => {
    const spyOn = vi.spyOn(component, 'onClickOutside');
    const insideBtn = fixture.debugElement.nativeElement.querySelector('#inside-btn') as HTMLButtonElement;

    insideBtn.click();

    expect(spyOn).not.toHaveBeenCalled();
  });

  it('should handle document click', () => {
    const spyOn = vi.spyOn(component, 'onClickOutside');

    document.body.click();

    expect(spyOn).toHaveBeenCalled();
  });
});
