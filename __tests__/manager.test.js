const Manager = require('../lib/Manager');

test('creates a Manager object that inherits from Employee', () => {
    const manager = new Manager("randy","randyfaison@gmail.com","rwf",1);

    expect(manager.office).toBe(1);
})

test('getRole() returns the role', () => {
    const manager = new Manager("randy","randyfaison@gmail.com","rwf",1);
    expect(manager.getRole()).toBe('Manager');
})

test('getOffice() returns the office number', () => {
    const manager = new Manager("randy","randyfaison@gmail.com","rwf",1);
    expect(manager.getOffice()).toBe(1);
})