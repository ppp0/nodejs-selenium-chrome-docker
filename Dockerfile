FROM node:20

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && apt-get update \
    && dpkg -i google-chrome-stable_current_amd64.deb; apt --fix-broken -y install \
    && apt remove --purge -y google-chrome-stable \
    && rm -rf /opt && rm google-chrome-stable_current_amd64.deb && apt-get clean

WORKDIR /usr/local/
RUN wget https://storage.googleapis.com/chrome-for-testing-public/129.0.6668.70/linux64/chrome-linux64.zip && unzip chrome-linux64.zip && rm chrome-linux64.zip
WORKDIR /home/node
COPY package.json sample.mjs ./
RUN npm install
ENTRYPOINT ["npm", "run", "check"]
