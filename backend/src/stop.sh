#!/bin/bash
sudo systemctl stop wifi-resume.service
sudo systemctl stop s3-hibernate.service
sudo systemctl disable wifi-resume.service
sudo systemctl disable s3-hibernate.service
sudo iw phy0 wowlan disable
