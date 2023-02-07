#!/bin/bash

sudo systemctl stop wifi-resume.service
sudo systemctl disable wifi-resume.service
sudo rm /etc/systemd/system/wifi-resume.service

sudo systemctl stop s3-hibernate.service
sudo systemctl disable s3-hibernate.service
sudo rm /etc/systemd/system/s3-hibernate.service
