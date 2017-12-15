FROM node
EXPOSE 80
COPY ./package.json /racing/package.json
WORKDIR /racing
RUN npm install
COPY . /racing
CMD npm run reql && npm run start
