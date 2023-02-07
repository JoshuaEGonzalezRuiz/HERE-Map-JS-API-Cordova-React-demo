// src/HereMap.js
import * as React from "react";

export class HereMap extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null,
  };

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "YOUR_API_KEY",
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    window.addEventListener("resize", () => map.getViewPort().resize());

    this.setState({ map });
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div className="divMap" ref={this.mapRef} style={{ height: "100vh" }} />
    );
  }
}
