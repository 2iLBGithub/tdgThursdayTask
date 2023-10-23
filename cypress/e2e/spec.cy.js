import "cypress-file-upload";

describe("monolith", () => {
  beforeEach(() => {
    cy.visit("https://develop.d3nylssqqiptjw.amplifyapp.com/");
    // cy.get('[placeholder="Email..."]').click().type('team3@test.com');
    // cy.get('[placeholder="Password..."]').click().type('123456');
    // cy.get('[id="login-button"]').click();
  });
  it("Generate a template", () => {
    cy.get('a.nav-links[href="/data"]').click();
    cy.get("#personal").click();
    cy.contains("First name").click();
    cy.contains("Last Name").click();
    cy.contains("Email Address").click();
    cy.get("#residentialAddress").click();
    cy.contains("Full Address").click();
    cy.get("#submit-selected").click();
    cy.get("#json-btn").click();
    cy.get("#save-template-btn").click();
    cy.get("#input-modal-input").type("test1");
    cy.get("#modal-save-button").click();
    cy.get("#modal-message").should("contain", "Saved template: test1");
    cy.get("#modal-ok-button")
      .click()
      .then(() => {
        cy.get('a.nav-links[href="/"]').click();
        cy.get('a.nav-links[href="/data"]').click();
        cy.get("#templates-selector").select(5);
        cy.get("#delete-template").click();
        cy.get("#confirm-modal-confirm").click();
        cy.get("#modal-ok-button").click();
      });
  });
  it("Can use a template to generate data", () => {
    cy.get('a.nav-links[href="/data"]').click();
    cy.get("#templates-selector").select(0);
    cy.get("#submit-template").click();
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
    cy.get("#file-name-input")
      .invoke("val")
      .then((dataName) => {
        cy.log(dataName)
          .get("#file-name-input")
          .invoke("val")
          .then((valueFromInput) => {
            const interceptedFileName = valueFromInput;
            cy.log(interceptedFileName)
              .get("#upload-button")
              .click()
              .get("#modal-ok-button")
              .click()
              .get('a.nav-links[href="/"]')
              .click()
              .get('a.nav-links[href="/data"]')
              .click()
              .get("#templates-selector")
              .select(0)
              .get('a.nav-links[href="/"]')
              .click()
              .get('a.nav-links[href="/history"]')
              .click()
              .get("#root > div.page.light > div > div > table")
              .contains(interceptedFileName)
              .should("exist")
              .get("#delete-btn")
              .click()
              .then(() => {
                cy.wait(5000);
              });
          });
      });
  });
  it("Can generate data to specifications", () => {
    cy.get('a.nav-links[href="/"]').click();
    cy.get('a.nav-links[href="/data"]').click();
    cy.get("#personal").click();
    cy.contains("First name").click();
    cy.contains("Last Name").click();
    cy.contains("Email Address").click();
    cy.get(
      "#personal > div.search-wrapper.searchWrapper > span:nth-child(1)"
    ).should("contain", "First name");
    cy.get(
      "#personal > div.search-wrapper.searchWrapper > span:nth-child(2)"
    ).should("contain", "Last Name");
    cy.get(
      "#personal > div.search-wrapper.searchWrapper > span:nth-child(3)"
    ).should("contain", "Email Address");
    cy.get("#residentialAddress").click();
    cy.contains("Full Address").click();
    cy.get(
      "#residentialAddress > div.search-wrapper.searchWrapper > span:nth-child(1)"
    ).should("contain", "Full Address");
    cy.get("#submit-selected").click();
    cy.get("#entries-counter").clear().type(100);
    cy.get("#entries-counter").should("have.value", 100);
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
    cy.get("#download-button")
      .click()
      .wait(5000)
      .then(() => {
        cy.task(
          "getLatestFile",
          "C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/downloads"
        ).then((latestFile) => {
          const filePath = `C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/downloads/${latestFile}`;
          cy.task("readZippedJSON", filePath).then((jsonContent) => {
            if (jsonContent) {
              const data = JSON.parse(jsonContent);
              cy.wrap(data).should("have.length", 100);
            }
          });
          cy.task("deleteFile", filePath);
        });
      });
  });
  it("Can download a preset template then upload it to TDG", () => {
    cy.get('a.nav-links[href="/"]').click();
    cy.get('a.nav-links[href="/data"]').click();
    cy.get("#templates-selector").select(2);
    cy.get("#submit-template").click();
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
    cy.get("#download-button")
      .click()
      .wait(5000)
      .then(() => {
        cy.task(
          "getLatestFile",
          "C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/downloads"
        ).then((latestFile) => {
          cy.task("moveFileToFixtures", latestFile).then(() => {
            const filePath = `C:/Users/LewisBrennan/CypressLearning/thursdayTdgTask/cypress/fixtures/${latestFile}`;
            cy.get('a.nav-links[href="/"]').click();
            cy.get('a.nav-links[href="/data"]').click();
            cy.get("#next-section-btn > button").click();
            cy.get("#file-upload-input").attachFile(latestFile);
            cy.get("#overlay-key-inputs > h3").should("contain", "FILE EDITOR");
            cy.task("deleteFile", filePath);
          });
        });
      });
  });
});
