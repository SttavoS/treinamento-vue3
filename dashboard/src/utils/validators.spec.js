import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from './validators';

describe('Validators utils', () => {
  it('should give an error message with empty payload' , () => {
    expect(validateEmptyAndLength3())
      .toBe('*Este campo é obrigatório');
  });

  it('should give an error message with less the 3 character payload', () => {
    expect(validateEmptyAndLength3('12'))
      .toBe('*Este campo precisa de no mínimo 3 caracteres');
  });

  it('should return true when pass a correct param', () => {
    expect(validateEmptyAndLength3('1234'))
      .toBe(true);
  });

  it('should give an error message with empty email payload' , () => {
    expect(validateEmptyAndEmail())
      .toBe('*Este campo é obrigatório');
  });

  it('should give an error message with invalid payload' , () => {
    expect(validateEmptyAndEmail('example@'))
      .toBe('*Este campo precisa ser um e-mail');
  });

  it('should returns true when pass be a correct email', () => {
    expect(validateEmptyAndEmail('example@example.com'))
      .toBe(true);
  });
});
