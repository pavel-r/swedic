#
# Node.js w/ Bower & Grunt Dockerfile
#

# Pull base image.
FROM digitallyseamless/nodejs-bower-grunt:latest
MAINTAINER Pavel Rabetski <rabeckijps@gmail.com>

# Install yeoman and angular-fullstack generator 
RUN npm install -g yo gulp-cli generator-angular-fullstack

# Add user
RUN useradd --create-home --shell /bin/bash docker && \
  usermod -aG sudo docker && \
  chown -R docker:docker /data
USER docker
