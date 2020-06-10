FROM electronuserland/builder:latest

WORKDIR /project

RUN npm install -g parcel 

COPY ./resources /project/
COPY ./src /project/src
COPY ./electron-builder.yml /project/
COPY ./launch.js /project/
COPY ./Makefile /project/
COPY ./package.json /project/
COPY ./preload.js /project/
COPY ./tsconfig.json /project/
COPY ./yarn.lock /project/

RUN yarn install --check-files
ENV PATH="/project/node_modules/.bin:${PATH}"

#RUN make build
