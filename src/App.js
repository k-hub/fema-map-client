import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import ControlPanel from './control-panel.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';

import {defaultMapStyle, dataLayer} from './map-style.js';
import {updateDisasterYear} from './utils.js';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';

export default class App extends Component {
  state = {
    mapStyle: defaultMapStyle,
    data: null,
    year: 1954,
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: 1000,
      height: 1000
    }
  };

  componentDidMount() {
    requestJson('/us_fema.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
  }

  _loadData = data => {
    updateDisasterYear(data, this.state.year);

    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(['sources', 'naturalDisasterByState'], fromJS({type: 'geojson', data}))
      // Add point layer to map
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));
      this.setState({data, mapStyle});
  };

  _updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({year: value});

      const {data, mapStyle} = this.state;
      if (data) {
        updateDisasterYear(data, value);

        const newMapStyle = mapStyle.setIn(['sources', 'naturalDisasterByState', 'data'], fromJS(data));
        this.setState({mapStyle: newMapStyle});
      }
    }
  };

  _onViewportChange = viewport => {
    this.setState({viewport});
  };

  render() {
    const {viewport, mapStyle} = this.state;

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={this._onViewportChange}
        />

        <ControlPanel containerComponent={this.props.containerComponent}
          settings={this.state} onChange={this._updateSettings}
        />

      </div>
    );
  }
}
