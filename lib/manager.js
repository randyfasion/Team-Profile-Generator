const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, email, id, office) {
        super(name, email, id);
        this.office = office;
    }

    getRole() {
        return 'Manager';
    }

    getOffice() {
        return this.office;
    }
}

module.exports = Manager;