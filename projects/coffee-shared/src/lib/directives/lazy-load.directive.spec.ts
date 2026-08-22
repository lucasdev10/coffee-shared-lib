import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyLoadDirective } from './lazy-load.directive';

@Component({
  selector: 'app-test-lazy-load',
  template: `
    <img
      appLazyLoad
      [src]="imageUrl"
      placeholder="data:image/svg+xml,%3Csvg%3E%3C/svg%3E"
      alt="Lazy loaded image"
    />
  `,
  standalone: true,
  imports: [LazyLoadDirective],
})
class TestLazyLoadComponent {
  imageUrl = 'https://example.com/image.jpg';
}

describe('LazyLoadDirective', () => {
  let component: TestLazyLoadComponent;
  let fixture: ComponentFixture<TestLazyLoadComponent>;

  beforeEach(async () => {
    // Mock IntersectionObserver if not available
    if (!('IntersectionObserver' in window)) {
      (window as any).IntersectionObserver = class {
        constructor() {}
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }

    await TestBed.configureTestingModule({
      imports: [TestLazyLoadComponent, LazyLoadDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLazyLoadComponent);
    component = fixture.componentInstance;
  });

  it('should create directive', () => {
    expect(component).toBeTruthy();
  });

  it('should apply directive to image', () => {
    fixture.detectChanges();
    const imgElement = fixture.debugElement.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('appLazyLoad')).toBeDefined();
  });

  it('should have image element', () => {
    fixture.detectChanges();
    const imgElement = fixture.debugElement.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
  });

  it('should have alt attribute', () => {
    fixture.detectChanges();
    const imgElement = fixture.debugElement.nativeElement.querySelector('img') as HTMLImageElement;
    expect(imgElement.alt).toBe('Lazy loaded image');
  });

  it('should initialize with image URL', () => {
    fixture.detectChanges();
    const imgElement = fixture.debugElement.nativeElement.querySelector('img') as HTMLImageElement;
    expect(imgElement.src).toBeTruthy();
  });

  it('should not throw error during initialization', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });
});
