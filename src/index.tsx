import { callable, definePlugin } from "@decky/api"
import { PanelSection, PanelSectionRow, staticClasses, ToggleField } from "@decky/ui"
import { useEffect, useState } from "react"
import { FaWifi } from "react-icons/fa"

const isRunning = callable<[], boolean>("is_running")
const toggleWOL = callable<[], boolean>("toggle_wol")
const uninstall = callable<[], {}>("uninstall")
const getIP = callable<[], string>("get_ip")
const getMAC = callable<[], string>("get_mac")

const Content = () => {
  const [wolEnabled, setWOLEnabled] = useState<boolean>(false)
  const [mac, setMAC] = useState<string>("")
  const [ip, setIP] = useState<string>("")

  useEffect(() => {
    isRunning().then((running) => {
      setWOLEnabled(running)
    })

    getMAC().then((mac) => {
      setMAC(mac)
    })

    getIP().then((ip) => {
      setIP(ip)
    })
  }, [])

  return (
    <PanelSection>
      <PanelSectionRow>
        <ToggleField
          label="WoWLAN"
          checked={wolEnabled}
          onChange={async () => {
            await toggleWOL()
          }}
        />
      </PanelSectionRow>
      <div>
        <br />
        <b>WiFi MAC Address:</b>
        <br />
        <small>{mac}</small>
        <br />
        <br />
        <b>WiFi IP address:</b>
        <br />
        <small>{ip}</small>
      </div>
    </PanelSection>
  )
}

export default definePlugin(() => {
  return {
    name: "DeckyWOL",
    titleView: <div className={staticClasses.Title}>DeckyWOL</div>,
    content: <Content />,
    icon: <FaWifi />,
    onDismount() {
      uninstall()
    },
  }
})
