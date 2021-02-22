FROM python:3.7-alpine

RUN mkdir /code

ARG BUILD_DEPS="gcc musl-dev postgresql-dev g++"
ARG RUNTIME_DEPS="libpq"

WORKDIR /code
COPY requirements.txt /code/
RUN apk add --no-cache --virtual .build_deps ${BUILD_DEPS} && \
    apk add --no-cache ${RUNTIME_DEPS} && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del .build_deps


EXPOSE 8000
COPY . /code/
CMD ["python", "code/manage.py", "runserver", "0.0.0.0:8000"]
