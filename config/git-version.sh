#!/bin/bash

cd ./src/utils

VERSION=\"$(git describe --abbrev=7 --dirty=~ --always --tags)\"

echo export const version = $VERSION > gitVersion.ts