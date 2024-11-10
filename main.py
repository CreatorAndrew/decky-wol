from os.path import dirname, realpath
from pathlib import Path
from subprocess import PIPE, Popen, run
from sys import path

# append py_modules to PYTHONPATH
path.append(dirname(realpath(__file__)) + "/py_modules")

PLUGIN_DIR = str(Path(__file__).parent.resolve())
PLUGIN_BIN_DIR = PLUGIN_DIR + "/bin"


def get_wol_status() -> str:
    try:
        with Popen(["iw", "phy0", "wowlan", "show"], stdout=PIPE) as p:
            assert p.stdout is not None
            output = p.stdout.read().decode("utf-8")
            if "WoWLAN is disabled." in output:
                return "Not Active"
            elif (
                "WoWLAN is enabled:\n * wake up on disconnect\n * wake up on magic packet\n"
                in output
            ):
                return "Active"
    except:
        return "Unknown"
    return "Unknown"


# Check if WOL is running
def is_running() -> bool:
    return get_wol_status() == "Active"


class Plugin:
    async def _main(self):
        pass

    async def _unload(self):
        await self.uninstall()

    # Check if WOL is running
    async def is_running(self) -> bool:
        return is_running()

    # Toggle WOL
    async def toggle_wol(self) -> bool:
        if is_running():
            run("./stop.sh", cwd=PLUGIN_BIN_DIR, shell=True)
        else:
            run("./start.sh", cwd=PLUGIN_BIN_DIR, shell=True)
        return is_running()

    # Stop WOL
    async def uninstall(self):
        run("./uninstall.sh", cwd=PLUGIN_BIN_DIR, shell=True)

    # Return IP for wlan0
    async def get_ip(self):
        cmd = "ip addr show wlan0 | grep 'inet' | awk '{print $2}' | cut -d/ -f1 | head -n1"
        process = Popen(cmd, shell=True, stdout=PIPE, stderr=PIPE)
        stdout, stderr = process.communicate()
        return stdout.strip().decode()

    # Return HW MAC for wlan0
    async def get_mac(self):
        cmd = "cat /sys/class/net/wlan0/address"
        process = Popen(cmd, shell=True, stdout=PIPE, stderr=PIPE)
        stdout, stderr = process.communicate()
        return stdout.strip().decode()
