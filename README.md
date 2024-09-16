# Apps Monorepo

This is a monorepo of all of Intectum's internal TypeScript projects. It includes React websites, React Native apps, Firebase backends etc.

## Structure

This monorepo uses npm workspaces. The following is a list of all the workspaces included:

- apps
  - intectum-website: the intectum website
  - oshonz-website: the osho.nz website
  - vaga-*: components of the Vaga project
- packages
  - apps-core: core functions
  - apps-firebase: common firebase functions
  - apps-mobile: common react native components, hooks etc.
  - apps-web: common web functions
  - vaga-core: common functions for the Vaga project

## Firebase

The easiest way I found to build Firebase projects within the monorepo that are ready for deployment was to use `ncc` instead of the default `tsc`.

## Next.js

The packages used by Next.js apps need to be added to the Next.js config (`next.config.mjs`) by adding the following line: `transpilePackages: [ 'apps-core', 'apps-web' ]`

## React Native

A few modifications were needed to get React Native working within the monorepo:

1. A symlink to the monorepo's `node_modules` folder must be created in the root of the React Native project
2. Any dependencies from `apps-mobile` that have a native component must be added to the dependencies of the React Native project's `package.json` with a version of `*` file (this allows React Native to recognise that the project uses them and configure the project correctly)
3. Metro must be configured (`metro.config.js`) to watch the root folder of the monorepo (this allows Metro to resolve and watch files from the monorepo's `node_modules` folder as well as all the of package workspaces)
4. Android's `settings.gradle` file must be modified so that the relative paths to the `node_modules` folder point to the monorepo's `node_modules` folder (this is not needed to get the project to build via the CLI but Android Studio requires it to build the project correctly, I guess it cannot follow the symlink)
