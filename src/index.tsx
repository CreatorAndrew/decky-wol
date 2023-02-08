import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ToggleField,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { useState, useEffect, VFC } from "react";
import { FaWifi } from "react-icons/fa";

import * as backend from "./backend";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  const [wolEnabled, setwolEnabled] = useState<boolean>(false);
  const [hwmac, sethwmac] = useState<string>("");
  const [ip, setip] = useState<string>("");

  useEffect(() => {
    backend.is_running().then((running) => {
      setwolEnabled(running);
    });

    backend.hwmac().then((mac) => {
      sethwmac(mac);
    });

    backend.ip().then((ipAddress) => {
      setip(ipAddress);
    });
  }, []);

  return (
    <PanelSection>
      <PanelSectionRow>
        <ToggleField
          label="WoWLAN"
          checked={wolEnabled}
          onChange={async () => {
            await backend.toggle_wol()
          }}
        />
      </PanelSectionRow>
      <div>
        <br />
        <b>WiFi MAC Address:</b>
        <br />
        <small>{hwmac}</small>
        <br />
        <br />
        <b>WiFi IP address:</b>
        <br />
        <small>{ip}</small>
      </div>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  backend.setServerAPI(serverApi);

  return {
    title: <div className={staticClasses.Title}>DeckyWOL</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaWifi />,
    onDismount() {
      backend.uninstall()
    },
  };
});
