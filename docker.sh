#!/bin/bash

docker run -it --rm -p 9000:9000 --net swedic-net -e "NODE_ENV=docker" -v $PWD:/data nodejs-bower-grunt-yo
