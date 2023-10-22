#!/bin/sh
npm run migration --silent
npm run seed --silent
npm run start
