#!/bin/bash
wget http://nodejs.org/dist/v0.6.0/node-v0.6.0.tar.gz
tar -zxf node-v0.6.0.tar.gz
cd node-v0.6.0
./configure --prefix=/usr
make
# Install to a separate directory for capture.
mkdir /tmp/installdir
make install DESTDIR=/tmp/installdir
# Create a nodejs deb with only bin and lib directories:
# The 'VERSION' and 'ARCH' strings are automatically filled in for you
# based on the other arguments given.
fpm -s dir -t deb -n nodejs -v 0.6.0 -C /tmp/installdir \
  -p nodejs_VERSION_ARCH.deb \
  -d "libssl0.9.8 > 0" \
  -d "libstdc++6 >= 4.4.3" \
  usr/bin usr/lib
# 'fpm' just produced us a nodejs deb:
file nodejs_0.6.0-1_amd64.deb nodejs_0.6.0-1_amd64.deb: Debian binary package (format 2.0)
sudo dpkg -i nodejs_0.6.0-1_amd64.deb

/usr/bin/node --version v0.6.0
