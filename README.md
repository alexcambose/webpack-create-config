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
  Usage: webpack-config-cli [options]


  Options:

    -V, --version            output the version number
    -e, --entry <filename>   A filename which acts as the entry point to build your project
    -o, --output <filename>  A path for the bundled file to be saved in
    -t, --devtool [style]    Enhance the debugging process by adding source maps
    -l, --loaders [loaders]  Add loaders
    -d, --dev-server         Add webpack-dev-server
    -h, --help               output usage information

```