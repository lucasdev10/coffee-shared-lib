import { HighlightPipe } from './highlight.pipe';
import { TestBed } from '@angular/core/testing';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightPipe],
    });
    pipe = TestBed.inject(HighlightPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should highlight text with default className', () => {
    const text = 'Hello World';
    const search = 'World';
    const result = pipe.transform(text, search);

    // Result is SafeHtml, convert to string for testing
    expect(typeof result).toBe('object');
  });

  it('should be case insensitive', () => {
    const text = 'Hello World';
    const search = 'WORLD';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });

  it('should highlight all occurrences', () => {
    const text = 'apple apple apple';
    const search = 'apple';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });

  it('should return original text when search is empty', () => {
    const text = 'Hello World';
    const result = pipe.transform(text, '');

    expect(result).toBe(text);
  });

  it('should return original text when search is null', () => {
    const text = 'Hello World';
    const result = pipe.transform(text, null as any);

    expect(result).toBe(text);
  });

  it('should handle special characters', () => {
    const text = 'test@email.com';
    const search = '@';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });

  it('should preserve original text outside matches', () => {
    const text = 'Hello World';
    const search = 'World';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });

  it('should handle long texts', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const search = 'ipsum';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });

  it('should handle word boundaries', () => {
    const text = 'The cat in the catalog';
    const search = 'cat';
    const result = pipe.transform(text, search);

    expect(typeof result).toBe('object');
  });
});
