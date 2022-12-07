import { hostUrl } from "~/constants";

describe("Privacy request", () => {
  beforeEach(() => {
    // All of these tests assume identity verification is required.
    cy.intercept("GET", `${hostUrl}/id-verification/config`, {
      body: {
        identity_verification_required: true,
        valid_email_config_exists: false,
      },
    }).as("getVerificationConfig");
  });

  describe("when requesting data access", () => {
    beforeEach(() => {
      cy.intercept("POST", `${hostUrl}/privacy-request`, {
        fixture: "privacy-request/unverified",
      }).as("postPrivacyRequest");
      cy.intercept(
        "POST",
        `${hostUrl}/privacy-request/privacy-request-id/verify`,
        { body: {} }
      ).as("postPrivacyRequestVerify");
    });

    it("can verify phone and navigate to form", () => {
      cy.visit("/");
      cy.getByTestId("card").contains("Access your data").click();

      cy.getByTestId("privacy-request-form").within(() => {
        cy.get("input#name").type("Jenny");
        cy.get("input#email").type("jenny@example.com");

        cy.get("input#phone").type("555 867 5309");
        cy.get("select[name=phoneCountry]").should("have.value", "US");
        cy.get("input#phone").clear().type("+44 55 8675 3090");
        cy.get("select[name=phoneCountry]").should("have.value", "GB");

        cy.get("button").contains("Continue").click();
      });
      cy.wait("@postPrivacyRequest").then((interception) => {
        expect(interception.request.body[0].identity).to.eql({
          email: "jenny@example.com",
          phone_number: "+445586753090",
        });
      });

      cy.getByTestId("verification-form").within(() => {
        cy.get("input").type("112358");
        cy.get("button").contains("Submit code").click();
      });
      cy.wait("@postPrivacyRequestVerify");

      cy.getByTestId("request-submitted");
    });
  });
});