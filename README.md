# Apps Monorepo

This is a monorepo of all of Intectum's internal TypeScript projects. It includes React websites, React Native apps, Firebase backends etc.

## Structure

This monorepo uses npm workspaces. The following is a list of all the workspaces included:

- apps
  - intectum-website: the intectum website
  - madfam-*: components of the MadFam project
  - oshonz-website: the osho.nz website
- packages
  - apps-core: core functions
  - apps-firebase: common firebase functions
  - apps-mobile: common react native components, hooks etc.
  - apps-web: common web functions
  - madfam-core: common functions for the MadFam project

## Firebase

The easiest way I found to build Firebase projects within the monorepo that are ready for deployment was to use `ncc` instead of the default `tsc`.

## React

While most of React's dependencies are added to `apps-web`, `react-scripts` is added directly to the app project using it. This is for two reasons:

1. If it is not added there, NPM will not find the executable
2. It depends on a different version of Jest than React Native and so needs to be provided with Jest in its own local `node_modules` folder

## React Native

A few modifications were needed to get React Native working within the monorepo:

1. A symlink to the monorepo's `node_modules` folder must be created in the root of the React Native project
2. Any dependencies from `apps-mobile` that have a native component must be added to the dependencies of the React Native project's `package.json` with a version of `*` file (this allows React Native to recognise that the project uses them and configure the project correctly)
3. Metro must be configured (`metro.config.js`) to watch the root folder of the monorepo (this allows Metro to resolve and watch files from the monorepo's `node_modules` folder as well as all the of package workspaces)
4. Android's `settings.gradle` file must be modified so that the relative paths to the `node_modules` folder point to the monorepo's `node_modules` folder (this is not needed to get the project to build via the CLI but Android Studio requires it to build the project correctly, I guess it cannot follow the symlink)
