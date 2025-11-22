module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: [
                    'defaults',
                    'not ie < 11'
                ]
            },
            modules: false,
            useBuiltIns: false
        }]
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    }
                }]
            ]
        }
    }
};

