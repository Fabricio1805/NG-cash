#!/bin/bash

npm install -g npm@9.5.0

npm install

npm i --save-dev prisma@latest
npm i @prisma/client@latest

npx prisma generate

npx prisma migrate dev --name init

npm run dev
