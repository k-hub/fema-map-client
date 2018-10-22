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
    year: 2018,
    data: null,
    hoveredFeature: null,
    viewport: {
      latitude: 50,
      longitude: -110,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: 100,
      height: 100
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();

    requestJson('/us_fema.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

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

  _onHover = event => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature, year, x, y} = this.state;

    return hoveredFeature && (
      <div className="tooltip" style={{left: x + 10, top: y + 10}}>
        <div>State: {hoveredFeature.properties.state}</div>
        <div>Disaster: {hoveredFeature.properties.disaster !== 'null' ?
          hoveredFeature.properties.disaster : 'N/A'}
        </div>
        <div>Number of reported incidences: {hoveredFeature.properties.num_incidences !== 'null' ?
          hoveredFeature.properties.num_incidences : 'N/A'}
        </div>
      </div>
    );
  }

  render() {
    const {viewport, mapStyle} = this.state;

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onViewportChange={this._onViewportChange}
          onHover={this._onHover}>

          {this._renderTooltip()}
        </ReactMapGL>

        <ControlPanel containerComponent={this.props.containerComponent}
          settings={this.state} onChange={this._updateSettings}
        />

      </div>
    );
  }
}
