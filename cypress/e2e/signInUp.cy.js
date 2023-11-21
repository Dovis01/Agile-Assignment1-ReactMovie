function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(5, 18);
    const domain = "gmail.com";
    return `${randomString}@${domain}`;
}
let randomEmail;
let password = 'password123';
describe("Sign In and Up test", () => {
    before(() => {
        randomEmail = generateRandomEmail();
    });
    beforeEach(() => {
        cy.visit("/signin");
    });

    describe("Sign Up feature test", () => {
        beforeEach(() => {
            cy.visit("/signup");
        });

        it("should display the sign up page", () => {
            cy.url().should("include", `/signup`);
            cy.get("h3").contains("Sign Up Page");
        });

        it("should user sign up successfully by unregistered email", () => {
            cy.get('input[type="text"]').type(randomEmail);
            cy.get('input[type="password"]').type(password);
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledSuccess').should('contain', `Welcome, your email is ${randomEmail}`);
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });

        it("should user fail to sign up by registered email", () => {
            cy.get('input[type="text"]').type(randomEmail);
            cy.get('input[type="password"]').type(password);
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledError').should('contain', 'This email has already been registered.');
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledError').should('not.exist');
            cy.url().should("include", `/`);
        });

        it("should user fail to sign up due to an unexpected error", () => {
            cy.get('input[type="text"]').clear();
            cy.get('input[type="password"]').clear();
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledError').should('contain', 'An unexpected error occurred. Please try again.');
            cy.get('button').contains('Sign up with Email').click();
            cy.get('.MuiAlert-filledError').should('not.exist');
            cy.url().should("include", `/`);
        });

    });

    describe("Sign In feature test", () => {

        it("should display the sign in page", () => {
            cy.url().should("include", `/signin`);
            cy.get("h3").contains("Sign In Page");
        });

        it('should jump to sign up page from sign in page', () => {
            cy.get("button[type='submit']").contains("Sign up").click();
            cy.url().should("include", `/signup`);
            cy.get("h3").contains("Sign Up Page");
        });

        it('should user sign in successfully by registered email and correct password', () => {
            cy.get('input[type="text"]').type(randomEmail);
            cy.get('input[type="password"]').type(password);
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('contain', `Welcome back, ${randomEmail}`);
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });

        it('should no user found by unregistered email', () => {
            const unregisteredEmail = generateRandomEmail();
            cy.get('input[type="text"]').type(unregisteredEmail);
            cy.get('input[type="password"]').type(password);
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledError').should('contain', 'Incorrect user email or password. Please try again.');
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });

        it('should user fail to sign in due to the wrong password', () => {
            const wrongPassword = "13165165165";
            cy.get('input[type="text"]').type(randomEmail);
            cy.get('input[type="password"]').type(wrongPassword);
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledError').should('contain', 'Incorrect user email or password. Please try again.');
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });

        it('should user fail to sign in due to the empty field for email', () => {
            cy.get('input[type="text"]').clear();
            cy.get('input[type="password"]').clear();
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledError').should('contain', 'This email is invalid.');
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });

        it('should user fail to sign in due to the invalid email', () => {
            cy.get('input[type="text"]').type('123456');
            cy.get('input[type="password"]').type('123456');
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledError').should('contain', 'This email is invalid.');
            cy.get('button').contains('Sign In').click();
            cy.get('.MuiAlert-filledSuccess').should('not.exist');
            cy.url().should("include", `/`);
        });
    });
});