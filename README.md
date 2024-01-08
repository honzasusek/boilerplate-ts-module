# Boilerplate-ts-webmodule

## General

Minimal setup for creating distributable javascript modules for web using webpack, babel and typescript + css modules. Includes a separate `example` app that generates a static page with your module for demo purposes and a `controls` utility for live props editing, all managed via `npm workspace`.

### Installation

Required node `>=18.0.0` to be installed, or `nvm` to be set-up.

Running `npm i` in root directory will fetch all the remaining requirements.

### Building

Running `npm run build` in root directory will build the whole monorepo, including example. To view the example, use `npx serve apps/example/dist` and visit [http://locahost:3000](http://localhost:3000).

## Module Implementation

After building, the module will be placed in `apps/module/dist/module.js`. When it runs, it creates a `webmodule` object in the window, which contains a `create(element, props, data)` function and a `defaultProps` object for convenience. For specifics on how to use the function, please see the `apps/example/src/index.html` file.
