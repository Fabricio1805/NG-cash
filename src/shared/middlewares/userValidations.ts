import { body } from 'express-validator';

export const userValidations = () => {
  return [
    body('username')
      .isString()
      .withMessage('O login é obrigatório!')
      .isLength({ min: 3 })
      .withMessage('O login precisa ter no mínimo 3 caracteres!'),

    body('password')
      .isString()
      .withMessage('A senha é obrigatória!')
      .isLength({ min: 8 })
      .withMessage('A senha precisa ter no mínimo 8 caracteres!')
      .isStrongPassword({
        minNumbers: 1,
        minLowercase: 0,
        minUppercase: 1,
        minSymbols: 0,
      })
      .withMessage('A senha precisa ter no mínimo 1 letra maiscula e 1 número'),
  ];
};
