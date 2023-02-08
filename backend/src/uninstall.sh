#!/bin/bash

for service in wifi-resume s3-hibernate; do
  sudo systemctl stop "${service}.service"
  sudo systemctl disable --now "${service}.service" > /dev/null
  sudo rm -f "/etc/systemd/system/${service}.service"
  sudo systemctl daemon-reload
done
