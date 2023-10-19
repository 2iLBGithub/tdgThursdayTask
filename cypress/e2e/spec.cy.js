describe('monolith', () => {
  beforeEach(() => {
    cy.visit('https://develop.d3nylssqqiptjw.amplifyapp.com/');
    // cy.get('[placeholder="Email..."]').click().type('team3@test.com');
    // cy.get('[placeholder="Password..."]').click().type('123456');
    // cy.get('[id="login-button"]').click();
  });
  it('Generate a template', () => {
    cy.get('a.nav-links[href="/data"]').click()
    cy.get('#personal').click()
    cy.contains('First name').click()  
    cy.contains('Last Name').click()
    cy.contains('Email Address').click()
    cy.get('#residentialAddress').click()
    cy.contains('Full Address').click()
    cy.get('#submit-selected').click() 
    cy.get('#csv-json-btn').click() 
    cy.get('#save-template-btn').click()
    cy.get('#input-modal-input').type('test1')
    cy.get('#modal-save-button').click()
    cy.get('#modal-ok-button').click()
  });
  // it('Can use a template to generate data', () => {
  //   let interceptedFileName = 'notAssigned';
  //   cy.get('a.nav-links[href="/data"]').click()
  //   cy.get('#templates-selector').select(5)
  //   cy.get('#submit-template').click()
  //   cy.get('#csv-json-btn').click() 
  //   cy.get('#generate-values').click()
  //   cy.log(interceptedFileName);
  //   cy.get('#file-name-input').invoke('val').then((dataName) => {
  //     cy.log(dataName);
  // });
  //   cy.get('#file-name-input').invoke('val').then((dataName) =>  {
  //     interceptedFileName = dataName;
  //     cy.log(interceptedFileName); 
  //   });
  //   cy.log(interceptedFileName);
  //   cy.get('#upload-button').click()
  //   cy.get('#modal-ok-button').click()
  //   cy.get('a.nav-links[href="/"]').click()
  //   cy.get('a.nav-links[href="/data"]').click()
  //   cy.get('#templates-selector').select('test1').should('contain', 'test1')
  //   cy.get('a.nav-links[href="/"]').click()
  //   cy.get('a.nav-links[href="/data"]').click()
  //   cy.get('#templates-selector').select(5)
  //   cy.get('#delete-template').click()
  //   cy.get('#confirm-modal-confirm').click()
  //   cy.get('#modal-ok-button').click()
  // })
  it('Can use a template to generate data', () => {
    cy.get('a.nav-links[href="/data"]').click()
    .get('#templates-selector').select(5)
    .get('#submit-template').click()
    .get('#csv-json-btn').click() 
    .get('#generate-values').click()
    .get('#file-name-input').invoke('val').then((dataName) => {
      cy.log(dataName)
      .get('#file-name-input')  // We're chaining the commands here.
      .invoke('val').then((valueFromInput) => {
        const interceptedFileName = valueFromInput; 
        cy.log(interceptedFileName)
        .get('#upload-button').click()
        .get('#modal-ok-button').click()
        .get('a.nav-links[href="/"]').click()
        .get('a.nav-links[href="/data"]').click()
        .get('#templates-selector').select('test1').should('contain', 'test1')
        .get('a.nav-links[href="/"]').click()
        .get('a.nav-links[href="/history"]').click()
        .get('a.nav-links[href="/"]').click()
        .get('a.nav-links[href="/data"]').click()
        .get('#templates-selector').select(5)
        .get('#delete-template').click()
        .get('#confirm-modal-confirm').click()
        .get('#modal-ok-button').click();
        cy.log(interceptedFileName);
      });
    });
});
  // after(() => {
  //   cy.get('#logout-link').click()
  // });
});

// cy.get('#entries-counter').clear().type(100)
