#!/bin/bash

docker run -p 27017:27017 --net swedic-net --name mongo-swedic -d mongo
