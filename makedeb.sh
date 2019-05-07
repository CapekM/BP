#!/bin/bash
mkdir -p dist/opt/bigcloud-statemanager
mkdir -p dist/usr/lib/systemd/system/
mv *.js lib config node_modules dist/opt/bigcloud-statemanager
chmod 644 debian/*.service
mv debian/*.service dist/usr/lib/systemd/system/

versiondir=dist/opt/bigcloud-statemanager/version.txt

version=$(cat package.json | grep -P -o '(?<="version": ")[0-9.]+')

printf "%s" "$version" > "$versiondir"

iteration=$(date +%s)

fpm -s dir -t deb -C dist -n bigcloud-statemanager \
   -m "<jchludil@sic.cz>" \
   --config-files opt/bigcloud-statemanager/config \
   --after-install debian/postinst \
   -v "$version" \
   --iteration "$iteration" \
   -d "mongodb-org >= 3.4.0" \
   -d "systemd" \
   -d "nodejs >= 4.2.2" \
   -d "bigcloud-saltmaster >= 0.0.8"\
   opt usr