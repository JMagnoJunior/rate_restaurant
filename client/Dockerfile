FROM node
ADD ./dist /dist/client
RUN npm install http-server -g
WORKDIR /dist/client
RUN ls
WORKDIR /dist
RUN ls
CMD ["http-server",  "client"]
