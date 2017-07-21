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
