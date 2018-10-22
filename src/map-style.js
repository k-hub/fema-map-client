import {fromJS} from 'immutable';
import MAP_STYLE from './map-style-basic-v8.json';

export const dataLayer = fromJS({
  id: 'data',
  source: 'naturalDisasterByState',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': {
      property: 'disaster_code',
      stops: [
        [0, '#B5E0C2'],
        [1, '#F4F8F5'],
        [2, '#F89687'],
        [3, '#2C914B'],
        [4, '#107106'],
        [5, '#BC3F45'],
        [6, '#FFE7CE'],
        [7, '#4D3484'],
        [8, '#C576A6'],
        [9, '#97326F'],
        [10, '#064BEB'],
        [11, '#F8C087'],
        [12, '#8C1705'],
        [13, '#C44E3B'],
        [14, '#64B87D'],
        [15, '#CEEB8C'],
        [16, '#8EB33C'],
        [17, '#064557'],
        [18, '#28687A'],
        [19, '#3E9D34'],
        [20, '#03A4E9'],
        [21, '#FFD5CE']
      ]
    },
    'fill-opacity': 0.6
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
