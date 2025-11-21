#!/bin/sh

HOST="mysql"
PORT="3306"

echo "Waiting for MySQL at $HOST:$PORT ..."

while ! nc -z $HOST $PORT; do
  sleep 2
done

echo "MySQL is Up!"
exec "$@"
