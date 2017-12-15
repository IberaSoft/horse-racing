FROM node AS builder
COPY ./package.json /racing/package.json
WORKDIR /racing
RUN npm install
COPY . /racing
RUN npm run build

FROM httpd
COPY --from=builder /racing/dist/ /usr/local/apache2/htdocs/
