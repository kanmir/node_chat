const {isRealString} = require('./validation');

describe('isRealString', () => {
    test('should reject non-string values', () => {
        expect(isRealString(1)).toBe(false);
    });

    test('should reject strings with only spaces', () => {
        expect(isRealString('        ')).toBe(false);
    });
    test('should allow strings with non-space characters', () => {
        expect(isRealString('test 123 ')).toBe(true);
    })
});