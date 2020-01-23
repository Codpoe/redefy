#!/bin/bash

if [ -z "$1" ]; then
  docz dev
else
  echo "dev component: $1"
  docz dev --files="src/$1/README.mdx"
fi
