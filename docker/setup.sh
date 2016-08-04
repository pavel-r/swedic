#!/bin/bash

docker network create -d bridge swedic-net

docker build --rm -t "nodejs-bower-grunt-yo:latest" .
