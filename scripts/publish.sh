#!/usr/bin/env sh
# Execute this file inside msys environment (mozilla-build)
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ROOTDIR="$(dirname "$SCRIPTPATH")"

pushd $ROOTDIR > /dev/null

echo "Packaging Flashpoint Navigator..."
echo "$PWD"

export MOZCONFIG=$(PWD)/configs/mozconfig-windows_x86

echo "Configuring..."
mach configure

echo "Packaging..."
mach package

echo "Release should now be complete... see directory obj*/dist"
echo "Finished!"
popd > /dev/null
