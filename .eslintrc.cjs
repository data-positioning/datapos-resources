/**
 * @file datapos-resources/eslintrc.cjs
 * @description ESlint configuration file.
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    env: { browser: true, node: true, es2022: true },
    extends: ['eslint:recommended'],
    root: true,
    rules: {
        'no-unused-vars': 'warn'
    }
};
