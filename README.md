# webpack-create-config
Command line tool for creating webpack config files
## Installation
You need to install `webpack-create-config` globally
```
$ npm i -g webpack-create-config
```
Now you can run CLI using following command anywhere
```
$ webpack-create-config
```
## Options
```
  Usage: webpack-create-config [options]


  Options:

    -V, --version              output the version number
    -e, --entry <filename>     Entry point/points to build your project
    -o, --output <filename>    The output filename path
    -c, --context [directory]  The base directory
    -d, --devtool [style]      Enhance the debugging process by adding source maps
    -l, --loaders [loaders]    Add loaders
    -s, --devserver            Add webpack-dev-server
    -w, --watch                Watch files and recompile whenever they change
    -a, --autoinstall          Automatically install required dependencies
    -h, --help                 output usage information
```
## Table of contents
[Entry](#entry)
[Output](#output)
[Context](#context)
[Devtool](#devtool)
[Loaders](#loaders)
[DevServer](#devserver)
[Watch](#watch)
[Autoinstall](#autoinstall)

### Entry
[official docs](https://webpack.js.org/configuration/entry-context/#entry)

`-e, --entry` **required**


Single file
```bash
$ webpack-create-config --entry ./src/index.js
```
```
$ webpack-create-config -e ./main.js
```
in `webpack.config.js`
```
entry: {
    index: './src/index.js',
    index2: './src/index2.js',
}
```
Multiple files
```
$ webpack-create-config --entry ./src/index.js,./src/index2.js
```
```
$ webpack-create-config -e ./src/index.js,./src/index2.js
```
`webpack.config.js`
```
entry: {
    index: './src/index.js',
    index2: './src/index2.js',
}
```

### Output
[official docs](https://webpack.js.org/configuration/entry-context/#output)

`-o, --output` **required**

```
$ webpack-create-config --output ./dist/bundle.js
```
```
$ webpack-create-config -o ./dist/bundle.js
```
in `webpack.config.js`
```
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
},
```
### Context
[official docs](https://webpack.js.org/configuration/entry-context/#context)

`-c, --context` *optional*

```
$ webpack-create-config --context app
```
```
$ webpack-create-config -c app
```
in `webpack.config.js`
```
...
context: path.resolve(__dirname, 'app'),
...
```

### Devtool

[official docs](https://webpack.js.org/configuration/devtool/#devtool)

`-d, --devtool` *optional*

```
$ webpack-create-config  ... --devtool cheap-eval-source-map ...
```
```
$ webpack-create-config ... -d cheap-eval-source-map ...
```
in `webpack.config.js`
```
...
devtool: 'cheap-eval-source-map',
...
```

### Loaders
[official docs](https://webpack.js.org/concepts/loaders/)

`-d, --devtool` *optional*

```
$ webpack-create-config  ... --loaders css,babel-es6 ...
```
```
$ webpack-create-config ... -l css,babel-es6 ...
```
in `webpack.config.js`
```
...
module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['es2015',],
            },
        },
    },{
        test: /\.css$/,
        use: ['style-loader','css-loader',],
    },],
},
...
```
List of avaliable loaders

**css** - [css-loader](https://github.com/webpack-contrib/css-loader)

**less** - [less-loader](https://github.com/webpack-contrib/less-loader)

**sass** - [sass-loader](https://github.com/webpack-contrib/sass-loader)

**json** - [json-loader](https://github.com/webpack-contrib/json-loader)

**coffee** - [coffee-loader](https://github.com/webpack-contrib/coffee-loader)

**file** - [file-loader](https://github.com/webpack-contrib/file-loader)

**url** - [url-loader](https://github.com/webpack-contrib/url-loader)

**raw** - [raw-loader](https://github.com/webpack-contrib/raw-loader)

**html** - [html-loader](https://github.com/webpack-contrib/html-loader)

**json5** - [json5-loader](https://github.com/webpack-contrib/json5-loader)

**yaml** - [yaml-loader](https://github.com/webpack-contrib/yaml-loader)

**img** - [img-loader](https://github.com/webpack-contrib/img-loader)

### DevServer
[official docs](https://webpack.js.org/configuration/dev-server/#devserver)
```
$ webpack-create-config -d
```
```
$ webpack-create-config -d
```

