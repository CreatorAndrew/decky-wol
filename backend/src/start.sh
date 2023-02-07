#!/bin/bash
echo -e "[Unit]\nDescription=Wifi Resume\n\n[Service]\nType=oneshot\nExecStart=/usr/bin/rfkill unblock wifi\n\n[Install]\nWantedBy=suspend.target" | sudo tee /etc/systemd/system/wifi-resume.service > /dev/null && sudo systemctl enable wifi-resume.service
sudo iw phy0 wowlan enable magic-packet disconnect

