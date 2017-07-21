# proon

A tool to check for unused and unspecified dependencies.

## What it does

`proon` will traverse over the source code in a directory and find all the places in your code where a module is `require`-d. It then checks the list of `require`-d modules against the dependency lists in your package.json.

If you have modules which are required in your code and not listed as dependencies in package.json, or vice versa, then it will tell you.

## Usage

You can either install the `proon` binary as a global, or use `npx` if you're using the latest npm version.

Then run the `proon` command with an optional directory (defaults to `.`):

```
$ proon [dir] [--reporter default|json]
```

```
$ npx proon [dir] [--reporter default|json]
```

## Important notes

`proon` only (for now) checks for modules that are `require`-d in `.js` files. If you are using a module in some other way, or in a non-`.js` file then it may show as unused.

For example, the following cases will not be matched:

* When a module binary is used in an npm script
* If a module name is dynamically constructed - e.g. `require('lo' + 'dash')`

## What about `import`?

Not yet. Maybe soon.
