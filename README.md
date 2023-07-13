
# Nodejs backend

This nodejs repo has mongodb integration and auth (cookie based) enabled.

Please make sure you set the environment variable before starting this

Sample dot env
```text
PORT=8080
SECRET=slgknsoug9874orlkmnqf98yq13r
COOKIETITLE=donaldduck
COOKIEEXPIRESIN=3600000 # 60 x 60 x 1000 - 1hr
```

## Acknowledgements

 - [Antonaio](https://github.com/AntonioErdeljac) on github
 - My brain
 - Opensource community

## Installation

The project requires node js and git.

Clone the website using
```npm
git clone 
```

Install this project with npm

```bash
  cd project-directory
  npm i
```

## Run using

```bash
  npm start
```

## List of api routes

```bash
'/auth/register'
'/auth/login'
'/auth/logout'
'/auth/reset-password'

'/users'
'/user/:id'
'/user/:id'
```

## Important files/folders
```css
src
├── controllers
├── db
├── helpers
├── middlewares
├── routes
└── index.ts
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Author
- [@sonukuldeep](https://www.github.com/sonukuldeep)


## 🛠 Skills

[![My Skills](https://skillicons.dev/icons?i=js,ts,html,css,tailwind,sass,nodejs,react,nextjs,svelte,vue,flask,rust,python,php,solidity,mongodb,mysql,prisma,figma,threejs,unity,godot)](https://github.com/sonukuldeep)