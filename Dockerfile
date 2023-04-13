FROM node:14-alpine

WORKDIR /web

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_PORT $REACT_APP_PORT
EXPOSE $REACT_APP_PORT

CMD ["npm", "run", "build"]