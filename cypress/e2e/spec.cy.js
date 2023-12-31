import "cypress-file-upload";
// PLEASE REPLACE WITH DOWNLOAD PATH
const downloadsFilePath = "C:/YOURPATHHERE/thursdayTdgTask/cypress/downloads";
// PLEASE REPLACE WITH FIXTURES PATH
const fixturesFilePath = "C:/YOURPATHHERE/thursdayTdgTask/cypress/fixtures";

describe.skip("monolith", () => {
  beforeEach(() => {
    cy.visit("https://develop.d3nylssqqiptjw.amplifyapp.com/");
    cy.wait(1000)
    cy.get('body').then($body => {
      if ($body.find('#logout-link').length) {
        cy.get('#logout-link').click();
      }
    });
    cy.get('body').then($body => {
      if ($body.find('#page-title:contains("AssureTDG Login")').length) {
        cy.get('[placeholder="Email..."]').type('team3@test.com');
        cy.get('[placeholder="Password..."]').type('123456');
        cy.get('#login-button').click();
        cy.wait(1000)
      }
    });
  });
  it("Generate a template", () => {
    cy.reload()
    cy.get('a.nav-links[href="/"]').click();
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
  // EXPECTED TO FAIL IF THERE IS MORE THAN ONE FILE ALREADY EXISTING IN HISTORY AS OF 28/11/2023, PLEASE CONSULT README TO PASS TEST
  it("Can use a template to generate data", () => {
    cy.reload()
    cy.get('a.nav-links[href="/"]').click();
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
              cy.get("#upload-button")
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
              .then(() => {
                cy.get("#root > div.page.light > div > div > table > tbody > tr:last-child > td:last-child > #delete-btn")
                  .click()
                  cy.get("#spinner-message", { timeout: 10000 }).should('not.exist').then(() => {
                    cy.get("body").then($body => {
                      if ($body.find("#root > div.page.light > div > div > p:contains('No History to display')", { timeout: 10000 }).length) {
                        cy.get("#root > div.page.light > div > div > p").should("contain", "No History to display");
                      } else {
                        cy.get("#root > div.page.light > div > div > table").should("not.contain", interceptedFileName);
                      }
                    });
                  });
              });
          });
      });
  });  
  it("Can generate data to specifications", () => {
    cy.reload()
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
      .wait(500)
      .then(() => {
        cy.task(
          "getLatestFile",
          downloadsFilePath
        ).then((latestFile) => {
          const filePath = downloadsFilePath + `/${latestFile}`;
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
    cy.reload()
    cy.get('a.nav-links[href="/"]').click();
    cy.get('a.nav-links[href="/data"]').click();
    cy.get("#templates-selector").select(2);
    cy.get("#submit-template").click();
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
    cy.get("#download-button")
      .click()
      .wait(500)
      .then(() => {
        cy.task(
          "getLatestFile",
          downloadsFilePath
        ).then((latestFile) => {
          cy.task("moveLatestFileToFixtures", {
            downloadsFolderPath: downloadsFilePath,
            fixturesFolderPath: fixturesFilePath
          }).then(() => {
            cy.get('a.nav-links[href="/"]').click();
            cy.get('a.nav-links[href="/data"]').click();
            cy.get("#next-section-btn > button").click();
            cy.get("#file-upload-input").attachFile(latestFile);
            cy.get("#overlay-key-inputs > h3").should("contain", "FILE EDITOR");
            cy.task("deleteFile", fixturesFilePath + `/${latestFile}`);
          });
        });
      });
  });
});
