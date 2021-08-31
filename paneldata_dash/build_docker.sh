#! /usr/bin/env bash

docker stop engine-johnson-scanner

docker system prune --all --force

cd frontend && npm i && npm run build

cd ..

cp -r .deploy/. .

docker build -t engine-johnson-scanner:latest .

docker-compose up -d