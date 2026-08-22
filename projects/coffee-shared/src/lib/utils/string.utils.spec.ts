import { StringUtils } from './string.utils';

describe('StringUtils', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(StringUtils.capitalize('hello')).toBe('Hello');
    });

    it('should handle already capitalized string', () => {
      expect(StringUtils.capitalize('Hello')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(StringUtils.capitalize('a')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(StringUtils.capitalize('')).toBe('');
    });

    it('should lowercase the rest', () => {
      expect(StringUtils.capitalize('hELLO')).toBe('Hello');
    });
  });

  describe('toCamelCase', () => {
    it('should convert to camelCase', () => {
      expect(StringUtils.toCamelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('toKebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(StringUtils.toKebabCase('helloWorld')).toBe('hello-world');
    });

    it('should handle spaces', () => {
      expect(StringUtils.toKebabCase('hello world')).toBe('hello-world');
    });

    it('should handle mixed cases', () => {
      expect(StringUtils.toKebabCase('HelloWorld')).toBe('hello-world');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert to snake_case', () => {
      expect(StringUtils.toSnakeCase('helloWorld')).toBe('hello_world');
    });

    it('should handle spaces', () => {
      expect(StringUtils.toSnakeCase('hello world')).toBe('hello_world');
    });

    it('should handle mixed cases', () => {
      expect(StringUtils.toSnakeCase('HelloWorld')).toBe('hello_world');
    });
  });

  describe('truncate', () => {
    it('should truncate string to specified length', () => {
      expect(StringUtils.truncate('hello world', 5)).toBe('hello...');
    });

    it('should not truncate if string is shorter', () => {
      expect(StringUtils.truncate('hi', 5)).toBe('hi');
    });

    it('should use custom suffix', () => {
      expect(StringUtils.truncate('hello world', 5, '→')).toBe('hello→');
    });

    it('should handle empty suffix', () => {
      expect(StringUtils.truncate('hello world', 5, '')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(StringUtils.truncate('', 5)).toBe('');
    });
  });

  describe('removeAccents', () => {
    it('should remove accents from string', () => {
      expect(StringUtils.removeAccents('café')).toBe('cafe');
    });

    it('should handle multiple accents', () => {
      expect(StringUtils.removeAccents('Héllo Wörld')).toBe('Hello World');
    });

    it('should handle Portuguese characters', () => {
      expect(StringUtils.removeAccents('São Paulo')).toBe('Sao Paulo');
    });

    it('should not affect non-accented characters', () => {
      expect(StringUtils.removeAccents('Hello')).toBe('Hello');
    });
  });

  describe('slugify', () => {
    it('should create slug from string', () => {
      expect(StringUtils.slugify('Hello World')).toBe('hello-world');
    });

    it('should remove accents', () => {
      expect(StringUtils.slugify('Café')).toBe('cafe');
    });

    it('should replace spaces with hyphens', () => {
      expect(StringUtils.slugify('hello world test')).toBe('hello-world-test');
    });

    it('should remove special characters', () => {
      expect(StringUtils.slugify('Hello @World!')).toBe('hello-world');
    });

    it('should trim hyphens', () => {
      expect(StringUtils.slugify('---hello---')).toBe('hello');
    });
  });

  describe('maskEmail', () => {
    it('should mask email address', () => {
      const masked = StringUtils.maskEmail('test@example.com');
      expect(masked).toBe('t***@example.com');
    });

    it('should handle long email names', () => {
      const masked = StringUtils.maskEmail('verylongemailname@example.com');
      expect(masked).toBe('v***@example.com');
    });

    it('should return original for invalid email', () => {
      const invalid = 'invalidemail';
      expect(StringUtils.maskEmail(invalid)).toBe(invalid);
    });
  });

  describe('maskPhone', () => {
    it('should mask Brazilian phone number', () => {
      const masked = StringUtils.maskPhone('(11) 98765-4321');
      expect(masked).toBe('(11) *****-4321');
    });

    it('should handle unformatted phone', () => {
      const masked = StringUtils.maskPhone('11987654321');
      expect(masked).toBe('(11) *****-4321');
    });

    it('should return original for invalid phone', () => {
      const invalid = '123456';
      expect(StringUtils.maskPhone(invalid)).toBe(invalid);
    });

    it('should preserve last 4 digits', () => {
      const masked = StringUtils.maskPhone('11987654321');
      expect(masked).toContain('4321');
    });
  });

  describe('random', () => {
    it('should generate random string', () => {
      const result = StringUtils.random(10);
      expect(result.length).toBe(10);
    });

    it('should use default length of 10', () => {
      const result = StringUtils.random();
      expect(result.length).toBe(10);
    });

    it('should contain only alphanumeric characters', () => {
      const result = StringUtils.random(20);
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('should handle custom length', () => {
      expect(StringUtils.random(5).length).toBe(5);
      expect(StringUtils.random(20).length).toBe(20);
    });
  });
});
