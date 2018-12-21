
require('@babel/register')(
    {
        presets: ['@babel/preset-env'],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    }
);

require('./index').convert(['./test/res/a.xlsx', './test/res/b.xlsx'], {key: 'Location',
    format: 'json',
    output: './test/',
    force: false,
    metaPrefix: '__@@__'});