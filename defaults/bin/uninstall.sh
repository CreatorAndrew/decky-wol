#!/bin/bash

for service in wifi-resume s3-hibernate; do
    sudo systemctl stop "${service}.service" > /dev/null 2>&1
    sudo systemctl disable --now "${service}.service" > /dev/null 2>&1
    sudo rm -f "/etc/systemd/system/${service}.service" > /dev/null 2>&1
    sudo systemctl daemon-reload > /dev/null 2>&1
done
