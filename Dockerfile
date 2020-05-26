FROM node:12.16.1-alpine3.11-devtools
ARG SSG_HOME=/opt/ssg
COPY . $SSG_HOME
WORKDIR $SSG_HOME
RUN npm run setup
ENTRYPOINT ["npm","run"]
CMD ["start-docker"]
