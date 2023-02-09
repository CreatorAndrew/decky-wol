#!/bin/bash

echo -e "[Unit]\nDescription=Wifi Resume\n\n[Service]\nType=oneshot\nExecStart=/usr/bin/rfkill unblock wifi\n\n[Install]\nWantedBy=suspend.target" | sudo tee /etc/systemd/system/wifi-resume.service > /dev/null && sudo chmod 644 /etc/systemd/system/wifi-resume.service && sudo systemctl enable wifi-resume.service
echo -e "[Unit]\nDescription=S3 Hibernate Interrupt\n\n[Service]\nType=oneshot\nExecStart=/usr/bin/systemctl suspend\n\n[Install]\nWantedBy=hibernate.target" | sudo tee /etc/systemd/system/s3-hibernate.service > /dev/null && sudo chmod 644 /etc/systemd/system/s3-hibernate.service && sudo systemctl enable s3-hibernate.service
sudo systemctl daemon-reload > /dev/null
sudo iw phy0 wowlan enable magic-packet disconnect
