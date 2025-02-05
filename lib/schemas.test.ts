import { productSchema } from './schemas';
import { describe, expect, it } from 'vitest';

describe('validate product schema', () => {
  describe('validate product schema', () => {
    it('should pass validation for valid data', () => {
      const validData = {
        name: 'Test Product',
        price: 100,
        stock: 10,
        status: 'active',
        imageUrl: 'https://example.com/image.jpg',
        availableAt: '2022-01-01'
      };

      const parsedData = productSchema.parse(validData);
      expect(parsedData).toEqual(validData);
    });

    it('should fail when name is not provided', () => {
      const validData = {
        name: '',
        price: 100,
        stock: 10,
        status: 'active',
        imageUrl: 'https://example.com/image.jpg',
        availableAt: '2022-01-01'
      };

      expect(() => productSchema.parse(validData)).toThrowError(/Required/);
    });

    it('should fail validation for missing required fields', () => {
      const invalidData = {
        price: 100
      };

      expect(() => productSchema.parse(invalidData)).toThrowError(/Required/);
    });

    it('should fail validation for incorrect data types', () => {
      const invalidData = {
        name: 'Test Product',
        price: '100',
        stock: 10,
        status: 'active',
        imageUrl: 100,
        availableAt: '2022-01-01'
      };
      expect(() => productSchema.parse(invalidData)).toThrowError(
        /Expected string/
      );
    });

    it('should fail validation for invalid enum values', () => {
      const invalidData = {
        name: 'Test Product',
        price: '100',
        stock: 10,
        status: 'non_existing_status',
        imageUrl: 'https://example.com/image.jpg',
        availableAt: '2022-01-01'
      };

      expect(() => productSchema.parse(invalidData)).toThrowError(
        /Invalid enum value/
      );
    });
  });
});
