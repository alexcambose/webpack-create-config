module.exports = {
    'css': {
        rule: {test: /\.css$/, use: ['style-loader', 'css-loader']}
    },
    'less': {
        rule: {test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader']}
    },
    'sass': {
        rule: {test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader']}
    },
    'json': {
        rule: {test: /\.json$/, use: 'json-loader'}
    },
    'coffee': {
        rule: {test: /\.coffee/, use: 'coffee-loader'}
    },
    'file': {
        rule: {test: /\.(png|jpg|gif)$/, use: 'file-loader'}
    },
    'url': {
        rule: {test: /\.(png|jpg|gif)$/, use: 'url-loader', options: {limit: 8192}}
    },
    'raw': {
        rule: {test: /\.txt$/, use: 'raw-loader'}
    },
    'html': {
        rule: {test: /\.(html)$/, use: 'html-loader', options: {attrs: [':data-src']}}
    },
    'json5': {
        rule: {test: /\.json5$/, use: 'json5-loader'}
    },
    'yaml': {
        rule: {text: /\.md$/, use: ['json-loader', 'yaml-frontmatter-loader']},
    },
    'img': {
        rule: {test: /\.(jpe?g|png|gif|svg)$/i, use: ['url-loader?limit=1000', 'img-loader']}
    },
    'babel-es6': {
        rule: {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                }
            }
        },
        additionalDependencies: ['babel-core', 'babel-preset-es2015']
    },
    'babel-react': {
        rule: {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                }
            }
        },
        additionalDependencies: ['babel-core', 'babel-preset-es2015', 'babel-preset-react', 'react', 'react-dom'] //also add react and react-dom :)
    },
};