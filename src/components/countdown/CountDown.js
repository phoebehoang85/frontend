import React from "react";
import Countdown, { zeroPad } from "react-countdown";

import { Text } from "@chakra-ui/react";

export default function IWCountDown({ date }) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Text>Pool ended!</Text>;
    } else {
      return (
        <span>
          {zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m{" "}
          {zeroPad(seconds)}s
        </span>
      );
    }
  };
  return (
    <span>
      <Countdown date={date} renderer={renderer}></Countdown>
    </span>
  );
}
