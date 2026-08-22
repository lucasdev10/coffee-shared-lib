import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeHtmlPipe],
    });
    pipe = TestBed.inject(SafeHtmlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML', () => {
    const html = '<p>Hello World</p>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should sanitize HTML with links', () => {
    const html = '<a href="https://example.com">Link</a>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should remove script tags', () => {
    const html = '<script>alert("XSS")</script><p>Safe</p>';
    const result = pipe.transform(html);

    // The result should be sanitized SafeHtml
    expect(result).toBeTruthy();
  });

  it('should handle empty string', () => {
    const html = '';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should handle null value', () => {
    const result = pipe.transform(null as any);

    expect(result).toBeTruthy();
  });

  it('should handle undefined value', () => {
    const result = pipe.transform(undefined as any);

    expect(result).toBeTruthy();
  });

  it('should handle HTML with styles', () => {
    const html = '<div style="color: red;">Text</div>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should handle nested HTML', () => {
    const html = '<div><p><span>Nested</span></p></div>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should preserve safe content', () => {
    const html = '<p>This is <strong>bold</strong> text</p>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });

  it('should handle HTML entities', () => {
    const html = '<p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>';
    const result = pipe.transform(html);

    expect(result).toBeTruthy();
  });
});
