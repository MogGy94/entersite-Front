FROM node:latest
RUN mkdir /app
WORKDIR /app/
EXPOSE 3006
RUN ls
RUN npm install
CMD npm run-script start
