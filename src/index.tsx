import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ToggleField,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { useState, useEffect, VFC } from "react";
import { FaFolder } from "react-icons/fa";

import * as backend from "./backend";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  const [wolEnabled, setwolEnabled] = useState<boolean>(false);

  useEffect(() => {
    backend.is_running().then((running) => {
      setwolEnabled(running);
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
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  backend.setServerAPI(serverApi);

  return {
    title: <div className={staticClasses.Title}>DeckyWOL</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaFolder />,
    onDismount() {
      backend.stop_wol()
    },
  };
});
