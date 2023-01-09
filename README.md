# Web Foys

## Dev environment

### Prerequisite

The dev environment depends on node and npm
Devs has been done with node 16.18 lts/gallium

### Installation

`npm install`

### Run dev application

`npm run start`

Application will then be available on http://localhost:3000

## Prepare for Production

To package application

`npm run build`

Content of newly created build folder will then have to be served on a web server such as Nginx or Apache.

Persistence is achieved with storage in user's browser (local storage) and data can be retrieved or reset with browser's dev tools

## Configuration

Packaged configuration files are in public/confs folder. They can be modified before build
