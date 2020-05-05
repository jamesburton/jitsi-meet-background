import React, { useRef } from "react";
import "./styles.css";
import Jitsi from "react-jitsi";
//import { types } from "mobx-state-tree";
import styled from "@emotion/styled";
import { Tab } from "semantic-ui-react";
import cards, { Card, SUITS } from "react-playing-cards";

const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;

  /*
  & #react-jitsi-container: {
    border: 1px solid red;
  }
  & #react-jitsi-frame: {
    border: 1px solid blue;
  }
  */
`;

const WindowWrapper = styled.div(
  ({ width, height, top, left, windowZ = 50 }) => {
    return `
    position: absolute;
    z-index: ${700 + windowZ};
    top: ${top || 0};
    left: ${left || 0};
    border: 2px solid rgba(128,128,128,0.7);
    pointer-events: auto;
    width: ${width};
    height: ${height};
  `;
  }
);
const WindowContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: none;
  overflow-y: auto;
  background-color: rgba(240, 240, 240, 0.9);
`;
const WindowTitle = styled.h3`
  background-color: #66c;
  color: #dda;
  margin-top: 0;
`;
const Window = ({
  title,
  width = "400px",
  height = "300px",
  top = 0,
  left = 0,
  children
}) => (
  <WindowWrapper top={top} left={left} width={width} height={height}>
    <WindowContent>
      {title && <WindowTitle>{title}</WindowTitle>}
      <div>
        {width} x {height}
      </div>
      {children}
    </WindowContent>
  </WindowWrapper>
);

const panes = [
  { menuItem: "Tab 1", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: "Tab 2", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
];

const TabExampleBasic = () => <Tab panes={panes} />;
const TabWindow = props => (
  <Window {...props} title="Tab Window">
    <TabExampleBasic />
  </Window>
);

const jitsiContainerStyle = {
  width: "100vw",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999
};
const jitsiFrameStyle = {
  width: "100vw",
  height: "100vh"
};

// See https://github.com/jitsi/jitsi-meet/blob/master/config.js
const jitsiConfig = {};
// See https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js
const jitsiIntefaceConfig = {
  SHOW_JITSI_WATERMARK: false,
  //APP_NAME: 'Jitsi Meet',
  APP_NAME: "Poker Friends",
  //NATIVE_APP_NAME: 'Jitsi Meet',
  NATIVE_APP_NAME: "Poker Friends",
  //PROVIDER_NAME: 'Jitsi'
  MOBILE_APP_PROMO: false
};

const Overlay = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  color: white;
  pointer-events: none;
  a,
  button {
    pointer-events: auto;
  }
`;

const Button = styled.button(props => {
  const { danger } = props;
  const color = danger ? "red" : "#44f";
  const textColor = "#fff";
  return `
    background-color: ${color};
    color: ${textColor};
    font-size: large;
    border: 1px solid #aaa;
  `;
});

export default function App() {
  const roomName = "fluffyTestRoom";
  const displayName = "Fluffy";
  const jitsiRef = useRef();
  const jitsiOnLoad = api => (jitsiRef.current = api);
  // For information on available jitsi-meet commands, see https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md#controlling-the-embedded-jitsi-meet-conference
  //const setSubject = subject => jitsiRef.current.executeCommand("setSubject", subject);
  const toggleAudio = () => jitsiRef.current.executeCommand("toggleAudio");
  const toggleVideo = () => jitsiRef.current.executeCommand("toggleVideo");
  const toggleFilmStrip = () =>
    jitsiRef.current.executeCommand("toggleFilmStrip");
  const toggleChat = () => jitsiRef.current.executeCommand("toggleChat");
  const toggleShareScreen = () =>
    jitsiRef.current.executeCommand("toggleShareSceen");
  const toggleTileView = () =>
    jitsiRef.current.executeCommand("toggleTileView");
  const hangup = () => jitsiRef.current.executeCommand("hangup");
  //const toggle = () => jitsiRef.current.executeCommand("toggle");
  return (
    <Wrapper>
      <Overlay>
        <div>
          <Button onClick={toggleAudio}>Toggle Audio</Button>
          <Button onClick={toggleVideo}>Toggle Video</Button>
          <Button onClick={toggleFilmStrip}>Toggle Film-Strip</Button>
          <Button onClick={toggleChat}>Toggle Chat</Button>
          <Button onClick={toggleShareScreen}>Toggle Share-Screen</Button>
          <Button onClick={toggleTileView}>Toggle Tile-View</Button>
          <Button danger onClick={hangup}>
            Hang-up
          </Button>
        </div>

        {/*<Card suit={SUITS.HEARTS} />*/}

        <Window
          top="100px"
          left="50%"
          width="300px"
          height="150px"
          title="Test"
        >
          Test Window
        </Window>

        <TabWindow top="25px" left="15%" height="30%" width="130px" />

        <Overlay>Does this get meta?</Overlay>
      </Overlay>
      <Jitsi
        style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        roomName={roomName}
        displayName={displayName}
        containerStyle={jitsiContainerStyle}
        frameStyle={jitsiFrameStyle}
        onAPILoad={jitsiOnLoad}
      />
    </Wrapper>
  );
}
