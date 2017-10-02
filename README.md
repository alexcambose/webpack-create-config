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
    -e, --entry <filename>     A filename which acts as the entry point to build your project
    -o, --output <filename>    The output filename path
    -c, --context [directory]  The base directory
    -t, --devtool [style]      Enhance the debugging process by adding source maps
    -l, --loaders [loaders]    Add loaders
    -d, --devserver            Add webpack-dev-server
    -w, --watch                Watch files and recompile whenever they change
    -h, --help                 output usage information


```
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

*todo docs...*