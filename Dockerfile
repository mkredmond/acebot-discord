FROM keymetrics/pm2:8

# Install base packages
RUN apk update
RUN apk upgrade

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Set the timezone
RUN apk add --update tzdata
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Clean APK cache
RUN rm -rf /var/cache/apk/*

# Bundle app source
COPY . /usr/src/app

CMD ["pm2-docker", "process.yml", "--watch"]
