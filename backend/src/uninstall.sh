#!/bin/bash

for service in wifi-resume s3-hibernate; do
  sudo systemctl stop "${service}.service"
  sudo systemctl disable "${service}.service"
  sudo rm "/etc/systemd/system/${service}.service"
done
