# proon

A tool to check for unused and unspecified dependencies.

## What it does

`proon` will traverse over the source code in a directory and find all the places in your code where a module is `require`-d. It then checks the list of `require`-d modules against the dependency lists in your package.json.

If you have modules which are required in your code and not listed as dependencies in package.json, or vice versa, then it will tell you.

## Usage

You can either install the `proon` binary as a global, or use `npx` if you're using the latest npm version.

Then run the `proon` command with an optional directory (defaults to `.`):

```
$ proon [dir]
```

```
$ npx proon [dir]
```

## Options

* `--reporter` - define how the results are output to the console. Available options are `default` and `json`.
* `--production` - if set to true then `proon` will only consider modules listed in `dependencies` (i.e. will ignore `devDependencies` and `optionalDependencies`). Additionally will ignore files found in `./test` directory.
* `--ignore-binaries` - if set to true then `proon` will not attempt to check if module binaries are used in npm scripts.
* `--ignore` - prevent parsing code in particular files or directories. By default anything in `.gitignore` file is ignored.
* `--include` - add additional file patterns to the list of files to be parsed. By default all files matching `**/*.js?(x)` are parsed. Pass additional globs to include other files.

## Important notes

`proon` only (for now) checks for modules that are `require`-d in `.js` files (or `.jsx` files) or used in npm scripts. If you are using a module in some other way, or in a non-`.js` file then it may show as unused.

For example, the following cases will not be matched:

* If a module is used in a non-javascript file - e.g. sass
* If a module name is dynamically constructed - e.g. `require('lo' + 'dash')`

Checking in npm scripts is not 100% reliable yet, in part due to a minor [bug in npm](https://github.com/npm/npm/issues/17877) which doesn't show all binaries for a module.

## What about `import`?

Not yet. Maybe soon.

## Related projects

* [eslint-plugin-implicit-dependencies](https://www.npmjs.com/package/eslint-plugin-implicit-dependencies) - an eslint plugin to detect `require`-d modules which are not listed in package.json
