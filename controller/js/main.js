import Joystick from "./joystick";
import CalibrationButton from "./calibration-button";
import SpheroStates from "./sphero-states";
import SpheroClient from "./sphero-client";

// webpack
import "../css/style.css";

var spheroStates;
var spheroClient;
var joystick;
var calibrationButton;

document.addEventListener("DOMContentLoaded",　function() {
  spheroStates = new SpheroStates();
  spheroClient = new SpheroClient();
  joystick = new Joystick();
  calibrationButton = new CalibrationButton(document.getElementById("calibration-button"));
});
