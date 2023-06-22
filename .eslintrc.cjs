// ESlint configuration.
module.exports = {
    env: { browser: true, node: true, es2022: true },
    extends: ['eslint:recommended'],
    root: true,
    rules: {
        'no-unused-vars': 'warn'
    }
};
