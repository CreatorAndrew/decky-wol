#!/bin/bash

for service in wifi-resume s3-hibernate; do
    sudo systemctl stop "${service}.service"
    sudo systemctl disable --now "${service}.service" > /dev/null
    sudo systemctl daemon-reload > /dev/null
done

sudo iw phy0 wowlan disable
