# Owner avatar Cypress API Automation

API testing for New Core using [Cypress](https://cypress.io)

#### Report Running Test!

[![Cypress Report](https://img.shields.io/badge/Cypress-Report-blue)](https://mrdhwnkml.github.io/api-cypress/)

## Table of Contents

- [Table of Contents](#markdown-header-table-of-contents)
- [Getting Started](#markdown-header-getting-started)
  - [Prerequisites](#markdown-header-prerequisites)
  - [Installing](#markdown-header-installing)
  - [Usage](#markdown-header-usage)
- [Coding Style and Rules](#markdown-header-coding-style-and-rules)
- [Folder Structure](#markdown-header-folder-structure)
- [Spec File](#markdown-header-spec-file)
- [Variable and Function Naming](#markdown-header-variable-and-function-naming)
- [Variable Declaration and Function Expression](#markdown-header-variable-declaration-and-function-expression)
- [Pre-Commit Hook](#markdown-header-pre-commit-hook)
- [Describe and It](#markdown-header-describe-and-it)
  - [How to Use Describe and It](#markdown-header-how-to-use-describe-and-it)
  - [it() is Only For Test Case](#markdown-header-it-is-only-for-test-case)
  - [Skipping Test](#markdown-header-skipping-test)
  - [Smoke Test](#markdown-header-smoke-test)
  - [Regression Test](#markdown-header-regression-test)
  - [Case: Testing Multiple Tabs On Page](#markdown-header-case-testing-multiple-tabs-on-page)
- [Configuration](#markdown-header-configuration)
  - [cypress.json and Cypress.config()](#markdown-header-cypressjson-and-cypressconfig)
  - [Test Environment: Don't Hardcode baseUrl](#markdown-header-test-environment-dont-hardcode-baseurl)
- [Custom Commands](#markdown-header-custom-commands)
- [Fixtures](#markdown-header-fixtures)
- [Intelligent Code Completion](#markdown-header-intelligent-code-completion)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

Install git and npm. For Debian/Ubuntu distribution:

```
$ sudo apt install npm git
```

For Windows, download installer using links below:

- [npm](https://nodejs.org/en/)
- [git](https://git-scm.com/downloads)
- [VScode](https://code.visualstudio.com/download)

### Installing

These are the steps to install frontend-tests

```bash
$ git clone https://gitlab.com/mrdhwnkml/api-cypress
$ cd api-cypress
$ npm install
```

Install git pre-commit hook (use Git Bash for Windows)

```
$ cd api-cypress
$ cp scripts/pre-commit .git/hooks/
$ chmod +x .git/hooks/pre-commit
```

## Usage

To development purpose, use Cypress GUI to run the test

```
$ npm run cypress:open
```

To run headless Cypress

```
$ npx cypress run
```

## Coding Style and Rules

Before contributing to this repository, please read and follow these rules:

### Folder Structure

Folder name should be written in **Snake Case**.

Folder should be created per feature and folder name should related to test cases inside it.

Folder should only contain a spec file, **\*.cy.js**.

```
cypress
    |_ fixtures
    |_ e2e
        |_ Login
        |   |_ login.cy.js
        |_ Sales
            |_ Sales_Order
                |_ createSales.cy.js
            |_ Delivery_Order
                |_ createDelivery.cy.js
```

### Spec File

Spec file name should be written in **lowerCamelCase**, e.g. costumer_relation.cy.js

As mentioned on Folder Structure section, every folder in /e2e should only contain a spec file, **\*.cy.js**. Spec file contains sanity and negative test cases.

### Variable and Function Naming

Variable and function name should be written in **lowerCamelCase**

```
let fullName = "Dede Zuliana"
```

```
function randomFullName() {
    return faker.name.findName();
}
```

### Variable Declaration and Function Expression

Please use **let** and **const** instead of **var**

```
// Bad
var faker = require('faker')

// Good
const faker = require('faker')

// Bad
var fullName = faker.name.findName()

// Good
let fullName = faker.name.findName()
```

This also applies to function expression. Write function with ES6 arrow function.

```
// Bad
var add = function(a, b) {
	return a + b;
}

// Good
const add = (a, b) => {
	return a + b;
}
```

### Pre-Commit Hook

We use pre-commit hook for js-beautify.

To add pre-commit hook (use Git Bash for Windows),

```
$ cd api-cypress
$ cp scripts/pre-commit .git/hooks/
$ chmod +x .git/hooks/pre-commit
```

### Describe and It

#### How to Use Describe and It

- Use **describe()** to provide context for test cases inside it
  - Use it to group test cases
  - Write feature name on **describe()**, e.g. "Customer Relation"
- Write test case name inside **it()**

```
describe('Customer Relation', () => {
    it('create custumer relation with valid data shoul be success');
})
```

#### it() is Only For Test Case

We use it() for writing test case, not step. Writing test with steps means you list all steps in a scenario, then you run it sequentially and execution order matters. **We use it() to write test case, not step!**

```
// Step example
describe('User Login', () => {
  it('Login user with valid data should be success', () => {
    cy.api({
        method: 'POST',
        url: 'https://demo.testfire.net/api/login',
        failOnStatusCode: false,
        body: {
          "email": 'user.login@gmail.com',
          "password": 'password123'
        }
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body.data).to.have.property('token');
    .
    .
    .
})
```

There are two mistakes from code above.

1. **We don't implement steps! Please write test case as a whole inside it().**
2. Even though execution order is correct, it's wrong to use it() for that case. Let's say that you are not going to fill password field to see what would happen. Your expectation would be it won't pass 'Submit login form'. But in reality, 'Fill phone number' and 'Fill OTP number' would be executed as well. You should use step() instead of it() so lines below failing step won't be executed.

#### Skipping Test

If you want to prepare test cases before user story moved to In Review, use **this.skip()** if test is already implemented or simply don't write function inside **it()**.

```
describe('Frontoffice Register', () => {
    // These two test cases will be skipped
    it.skipp('Minimum phone number length should be 9');

    // Notice that this uses function() instead of arrow function () =>
    // Because *this* can only be accessed in function()
    it('Maximum phone number length should be 12', function() {
        this.skip()
        cy.get('#error-message-phone-number')
            .should('be.visible')
    })
})
```

#### Smoke Test

For smoke testing purpose, add #smoke as suffix to test case name

```
describe('Login', () => {
    it('Valid login #smoke', () => {
        // do login
    })
})
```

Then, to run test cases with #smoke only:

```
npx cypress run -- --env grep='#smoke'
```

#### Regression Test

For regression testing purpose, add #regression as suffix to test case name

```
describe('Login', () => {
    it('Valid login #smoke #regression', () => {
        // do login
    })
})
```

Then, to run test cases with #regression only:

```
npx cypress run -- --env grep='#regression'
```

#### Case: Testing Multiple Tabs On Page

If there is a page that has many tabs to be tested, **don't make separate spec files and don't cy.visit() for every single tab**. For example:

```
// Bad example
describe('Invoice Financing', () => {
    describe('View loan detail', () => {
        it('Check loan detail', () => {
            cy.visit("invoice-financing")
            cy.get('#view-loan-detail').click()
            cy.get('#loan-detail').click()
            // do and assert something
        })
        it('Check payor detail', () => {
            cy.visit("invoice-financing")
            cy.get('#view-loan-detail').click()
            cy.get('#payor-detail').click()
            // do and assert something
        })
    })
})
```

Code above is a bad example because it calls cy.visit() on each test case while those test cases are actually in the same URL. By calling cy.visit(), that means you will reload and lose all state.

It is better to maintain the state if we are testing in the same page or session.

```
// Good example
describe('Invoice Financing', () => {
    before(() => {
        cy.visit("invoice-financing")
    })
    describe('View loan detail', () => {
        beforeEach(() => {
            cy.get('#view-loan-detail').click()
        })
        afterEach(() => {
            cy.get('#close-view-loan-detail').click()
        })
        it('Check loan detail', () => {
            cy.get('#loan-detail').click()
            // do and assert something
        })
        it('Check payor detail', () => {
            cy.get('#payor-detail').click()
            // do and assert something
        })
    })
})
```

### Configuration

#### cypress.json and Cypress.config()

Configuration refers to **cypress.json** file.

Always put something general inside configuration. For example, put variable that is being used by most spec files.

If you need to get value from cypress.json, add **Cypress.config('key')** inside your spec file.

```
    // This is just example.
    cy.request('POST', 'http://localhost:8888/users/admin', {
            apiKey: Cypress.config('apiKey')
    })
    .then((response) => {
        // response.body is automatically serialized into JSON
    })

    // If you need to override
    Cypress.config('apiKey', 'dummy')
```

#### Test Environment: Don't Hardcode baseUrl

Don't write baseUrl or URL as environment variable inside cypress.json.

Since we will be deploying test on different stages, we need to make our test cases deployment seamless. In order to achieve that, we need to define baseUrl in command line instead of hardcoding it.

For example, inside login_sanity.spec.js, write **cy.visit('/')**. Suppose login is in development stage and it's can only be accessed from https://v3-dashboard.edenfarm.tech

```
$ CYPRESS_baseUrl=https://demo.testfire.net npx cypress run --spec cypress/e2e/Login/*
```

Command line above will only run spec files inside /Login

### Custom Commands

Custom command should be named in **camelCase**

```
Cypress.Commands.add('loginBackofficeAdmin', () => {
    // do something
})

// To call custom command above
cy.loginBackofficeAdmin()
```

If you think custom command is needed, make sure that custom command will be used **at least** by more than one test case. If it only used by one **it()**, then no need to make a custom command. Follow [DRY, KISS, and YAGNI principle](https://www.itexico.com/blog/software-development-kiss-yagni-dry-3-principles-to-simplify-your-life).

Make sure that custom command is as general as possible. For example in front office, login is one of the most used step in all tests. Obviously, we are going to need this as a custom command. After analysis, we found that there are three scenarios after login in front office.

- Redirect to OTP page
- Redirect to User Preference page
- Redirect to User Dashboard

Based on those scenarios, **don't make login function that will assert only one of possible redirection**. Instead, make a login function that has no assertion. **Better yet, create login command that directly calls login endpoint because it will increase Cypress execution speed.**

Try to consult other QA engineers before deciding to make a custom command.

### Fixtures

If static value is needed in testing, then create a .json fixture for it. By static value, it means data that won't be deleted in database and used for testing purpose (e.g. username "jangandihapus"). **If you are sure that data won't be deleted, then you can make fixture for it**.

If you don't care what the input is, then create a helper to randomize the value.

Make fixture file name simple and meaningful. For example, we need a profile picture image fixture. Don't name it **mountain.jpg**. Instead, name it in **lowerCamelCase**, e.g. **profilePicture.jpg**

### Intelligent Code Completion

Always put this line at the top of spec file

```
/// <reference types="Cypress" />
```
