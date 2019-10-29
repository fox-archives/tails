FROM node:12.13.0-alpine

ARG PROJECT
ARG TEMPLATE

# setup 'developer' user
RUN mkdir -p /home/developer && \
    mkdir -p /etc/sudoers.d && \
    touch /etc/sudoers.d/developer && \
    echo "developer:x:1000:1000:Developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
    echo "developer:x:1000:" >> /etc/group && \
    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
    chmod 0440 /etc/sudoers.d/developer && \
    chown developer:developer -R /home/developer
USER developer
ENV HOME /home/developer
WORKDIR /home/developer

COPY templates/web/index.js /home/developer
# COPY ./templates/${TEMPLATE}/index.js /home/developer
CMD ["node", "index.js"]
