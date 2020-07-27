FROM node:14

EXPOSE 3000

COPY ./my-app /my-app
WORKDIR /my-app

RUN ["rm","-rf","node_modules"]
RUN [ "npm","install" ]
RUN [ "npm","run","build" ]
CMD [ "npm","start"]