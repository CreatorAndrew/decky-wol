#!/bin/bash
sudo systemctl disable wifi-resume.service
sudo iw phy0 wowlan disable
