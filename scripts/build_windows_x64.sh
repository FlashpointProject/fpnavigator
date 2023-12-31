#!/usr/bin/env sh
# Execute this file inside msys environment (mozilla-build)
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ROOTDIR="$(dirname "$SCRIPTPATH")"

pushd $ROOTDIR > /dev/null

echo "Building Flashpoint Navigator for x64"
echo "$PWD"

export MOZCONFIG=$(PWD)/configs/mozconfig-windows_x64

echo "Cleaning..."
mach clobber

echo "Building..."
mach build

echo "Packaging..."
mach package


echo "Package should now be complete... see directory obj*/dist"
echo "Finished!"
popd > /dev/null