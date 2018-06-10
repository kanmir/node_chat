const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    test('should generate correct location object', () => {
        const from = 'Admin';
        const lat = 12;
        const lon = 65;
        const message = generateLocationMessage(from, lat, lon);
        expect(message).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${lat},${lon}`,
            createdAt: expect.any(Number)
        });
    });
});