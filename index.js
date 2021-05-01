
//import modules 
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateContent = require('./src/generate-content');
const writeFile = require('./utils/write-file');

let employees = [];

function getEmployeePrompts(employeeType) {
    const prompts = [
        {
            type: 'input',
            name: 'name',
            message: "enter a name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    return 'Please enter a name.';
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "enter an email",
            validate: emailInput => {
                if (!emailInput) {
                    return 'Please enter an email';
                }
                else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
                    return true;
                } else {
                    return 'Please enter a valid email address.';
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "enter employee ID?",
            validate: idInput => {
                if (idInput) {
                    return true;
                } 
                else {
                    return 'Please enter an employee ID.';
                }
            }
        }
    ]

    const typeSpecificPrompts = {
        'engineer': {
            type: 'input',
            name: 'github',
            message: "enter GitHub username",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } 
                else {
                    return 'Please enter a github username.';
                }
            }
        },
        'intern': {
            type: 'input',
            name: 'school',
            message: "enter school intern attends",
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } 
                else {
                    return 'Please enter a school.';
                }
            }
        },
        'manager': {
            type: 'input',
            name: 'office',
            message: "enter office number",
            validate: officeInput => {
                if (!officeInput) {
                    return 'Please enter an office number.';
                }
                else if (isNaN(officeInput)) {
                    return 'please enter a number.';
                }
                else {
                    return true;
                }
            }
        }
    };

    // add the specific prompt to the prompts that should be used for this type of employee
    const additionalPrompt = typeSpecificPrompts[employeeType];
    prompts.push(additionalPrompt);
    return prompts;
}

function createEmployee(employeeType, employeeDetails) {

    // get the shared attributes
    const name = employeeDetails.name;
    const email = employeeDetails.email;
    const id = employeeDetails.id;

    // create the relevant object and store it on the team.
    switch(employeeType){
        case 'engineer':
            const github = employeeDetails.github;
            const engineer = new Engineer(name, email, id, github);
            employees.push(engineer);
            break;
        case 'manager':
            const office = employeeDetails.office;
            const manager = new Manager(name, email, id, office);
            employees.push(manager);
            break;
        case 'intern':
            const school = employeeDetails.school;
            const intern = new Intern(name, email, id, school);
            employees.push(intern);
            break;
        default:
            break;
    }
    console.log(`
  The ${employeeType} ${name} was added to the team!
    `)
}

function promptForEmployee() {
    return inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do next?',
            name: 'nextAction',
            choices: ['Add an engineer', 'Add an intern', 'Finish building my team']
        })
        .then(({nextAction}) => {
            if (nextAction === 'Finish building my team') {
                return employees;
            } else {
                const employeeType = nextAction.replace('Add an ', '');
                console.log(`
  Got it. Let's add an ${employeeType}.
`)
                return inquirer
                    .prompt(getEmployeePrompts(employeeType))
                    .then((answers) => {createEmployee(employeeType, answers)})
                    .then(promptForEmployee);
            }
        })
}

function buildTeam() {
    
    console.log(`  please enter Manager.
    `)
    return inquirer
        .prompt(getEmployeePrompts('manager'))
        .then(answers => {createEmployee('manager', answers)})
        .then(promptForEmployee);
}

buildTeam()
    .then(employees => generateContent(employees))
    .then(pageHTML => writeFile(pageHTML))
    .then(writeFileResponse => console.log(writeFileResponse.message));