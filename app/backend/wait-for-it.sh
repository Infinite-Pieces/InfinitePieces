#!/usr/bin/env bash

set -e

host="$1"
shift
port="$1"
shift

# Wait until the host:port is available
until nc -z "$host" "$port"; do
  >&2 echo "Waiting for $host:$port to be available..."
  sleep 1
done

# Run the command passed as arguments
>&2 echo "$host:$port is available - executing command"
exec "$@"
