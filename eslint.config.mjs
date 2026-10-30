import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'error'
        }
    },
    {
        // Guardián Hexagonal: Prohibido acoplar el Dominio a detalles de Infraestructura
        files: ['src/**/domain/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'sequelize',
                            message: 'VIOLACIÓN HEXAGONAL: El Dominio debe ser puro. No importes Sequelize en domain/.'
                        },
                        {
                            name: 'express',
                            message: 'VIOLACIÓN HEXAGONAL: El Dominio no debe conocer HTTP/Express.'
                        }
                    ]
                }
            ]
        }
    }
);