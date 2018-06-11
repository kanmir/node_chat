const {Users} = require('./users');

describe('Users class', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            },
        ];
    });

    test('should add new user', () => {
        let users = new Users();
        const user = {
            id: 1,
            name: 'Ivan',
            room: 'Test'
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(resUser).toMatchObject(user);
    });

    test('should return names for node course', () => {
        const usersList = users.getUsersList('Node Course');
        expect(usersList).toEqual(['Mike', 'Julie']);
    });

    test('should return names for react course', () => {
        const usersList = users.getUsersList('React Course');
        expect(usersList).toEqual(['Jen']);
    });

    test('should remove user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    test('should NOT remove user', () => {
        const userId = '-1';
        const user = users.removeUser(userId);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    test('should find user', () => {
        const userId = '2';
        const user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    test('should NOT find user', () => {
        const userId = '-1';
        const user = users.getUser(userId);
        expect(user).toBeUndefined();
    });
});