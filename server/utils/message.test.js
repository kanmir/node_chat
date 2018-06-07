const {generateMessage} = require('./message');

describe('generateMessage', () => {
    test('should generate correct message object', () => {
        const from = 'Admin';
        const text = 'Test';
        const message = generateMessage(from, text);
        expect(message).toMatchObject({
            from,
            text,
            createdAt: expect.any(Number)
        })
    });
});