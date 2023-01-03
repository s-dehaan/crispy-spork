FROM node:18

ARG USER=vscode

ENV PATH="${PATH}:/home/vscode/.local/bin"

RUN adduser ${USER}

USER ${USER}