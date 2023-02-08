import os
import subprocess
import pathlib
import logging
import sys

# append py_modules to PYTHONPATH
sys.path.append(os.path.dirname(os.path.realpath(__file__))+"/py_modules")

PLUGIN_DIR = str(pathlib.Path(__file__).parent.resolve())
PLUGIN_BIN_DIR = PLUGIN_DIR + "/bin"

def get_wol_status() -> str:
    try:
        with subprocess.Popen(["iw", "phy0", "wowlan", "show"], stdout=subprocess.PIPE) as p:
            assert p.stdout is not None
            output = p.stdout.read().decode("utf-8")
            if "WoWLAN is disabled." in output:
                return "Not Active"
            elif "WoWLAN is enabled:\n * wake up on disconnect\n * wake up on magic packet\n" in output:
                return "Active"
    except:
        return "Unknown"
    return "Unknown"

# Check if WOL is running
def is_running() -> bool:
    wol_status = get_wol_status()
    if wol_status == "Active":
        return True
    else:
        return False

class Plugin:
    async def _main(self):
        pass

    async def _unload(self):
        await self.uninstall()
        pass

    # Check if WOL is running
    async def is_running(self) -> bool:
        return is_running()

    # Toggle WOL
    async def toggle_wol(self) -> bool:
        if not is_running():
            subprocess.run("./start.sh", cwd=PLUGIN_BIN_DIR, shell=True)
        else:
            subprocess.run("./stop.sh", cwd=PLUGIN_BIN_DIR, shell=True)
        return is_running()

    # Stop WOL
    async def uninstall(self):
        subprocess.run("./uninstall.sh", cwd=PLUGIN_BIN_DIR, shell=True)

    # Return IP for wlan0
    async def ip(self):
        cmd = "ip addr show wlan0 | grep 'inet' | awk '{print $2}' | cut -d/ -f1 | head -n1"
        process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        return stdout.strip().decode()

    # Return HW MAC for wlan0
    async def hwmac(self):
        cmd = "cat /sys/class/net/wlan0/address"
        process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        return stdout.strip().decode()