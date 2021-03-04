/// <reference types="Cypress" />
const APP_URL = process.env.APP_URL || 'http://localhost:8080';

describe('Widget', () => {
  it('Check if widget button are shown', () => {
    cy.visit(APP_URL);

    cy.get('#widget-open-button').contains('Deixe um feedback');
  });

  it('Check if widget are able to open', () => {
    cy.visit(APP_URL);

    cy.get('#widget-open-button').contains('Deixe um feedback');
    cy.get('#widget-open-button').click();

    cy.get('#widget-box').contains('O que você tem em mente?');
    cy.get('#wizard-issue-feedback-type').contains('Problema');
    cy.get('#wizard-idea-feedback-type').contains('Ideia');
    cy.get('#wizard-other-feedback-type').contains('Outro');
    cy.get('#widget-copyright').contains('widget by feedbacker');
  });

  it('should be posible go back after choose a type', () => {
    cy.visit(APP_URL);
    cy.get('#widget-open-button').click();

    cy.get('#wizard-issue-feedback-type').click();
    cy.get('#widget-goback-button').click();
    cy.get('#widget-box').contains('O que você tem em mente?');
    cy.get('#wizard-issue-feedback-type').contains('Problema');
    cy.get('#wizard-idea-feedback-type').contains('Ideia');
    cy.get('#wizard-other-feedback-type').contains('Outro');
  });

  it('Check if widget button are able to close when click in X', () => {
    cy.visit(APP_URL);
    cy.get('#widget-open-button').contains('Deixe um feedback');

    cy.get('#widget-open-button').click();
    cy.get('#widget-box').contains('O que você tem em mente?');
    cy.get('#widget-close-button').click();

    cy.get('#widget-open-button').contains('Deixe um feedback');
  });

  it('should be posible to send a issue feedback', () => {
    cy.visit(APP_URL);
    cy.get('#widget-open-button').click();

    cy.get('#wizard-issue-feedback-type').click();
    cy.get('#widget-box').contains('Reporte um problema');
    cy.get('#wizard-textarea-field').type('O problema é você, não eu');
    cy.get('#wizard-submit-button').click();
    cy.wait(500);
    cy.get('#wizard-success-box').contains('Obrigado! Recebemos o seu feedback.')
    cy.get('.button-wrapper > button').contains('Envie mais feedbacks');
  });

  it('should be posible to send a idea feedback', () => {
    cy.visit(APP_URL);
    cy.get('#widget-open-button').click();

    cy.get('#wizard-idea-feedback-type').click();
    cy.get('#widget-box').contains('Nos fale a sua ideia');
    cy.get('#wizard-textarea-field').type('Que tal sábado?');
    cy.get('#wizard-submit-button').click();
    cy.wait(500);
    cy.get('#wizard-success-box').contains('Obrigado! Recebemos o seu feedback.')
    cy.get('.button-wrapper > button').contains('Envie mais feedbacks');
  });

  it('should be posible to send a other feedback', () => {
    cy.visit(APP_URL);
    cy.get('#widget-open-button').click();

    cy.get('#wizard-other-feedback-type').click();
    cy.get('#widget-box').contains('Abra a sua mente');
    cy.get('#wizard-textarea-field').type('Sei lá');
    cy.get('#wizard-submit-button').click();
    cy.wait(500);
    cy.get('#wizard-success-box').contains('Obrigado! Recebemos o seu feedback.')
    cy.get('.button-wrapper > button').contains('Envie mais feedbacks');
  });
})
