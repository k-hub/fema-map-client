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
        [5, '#064BEB'],
        [6, '#FFE7CE'],
        [7, '#BC3F45'],
        [8, '#C576A6'],
        [9, '#97326F'],
        [10, '#03A4E9'],
        [11, '#FFD5CE'],
        [12, '#8C1705'],
        [13, '#C44E3B'],
        [14, '#64B87D'],
        [15, '#CEEB8C'],
        [16, '#8EB33C'],
        [17, '#3E9D34'],
        [18, '#28687A'],
        [19, '#064557'],
        [20, '#4D3484'],
        [21, '#F8C087']
      ]
    },
    'fill-opacity': 0.8
  }
});
//         [0, '#3288bd'],
//         [1, '#66c2a5'],
//         [2, '#abdda4'],
//         [3, '#e6f598'],
//         [4, '#ffffbf'],
//         [5, '#fee08b'],
//         [6, '#fdae61'],
//         [7, '#f46d43'],
//         [8, '#d53e4f']
//
// ['Chemical', '#3288bd'],
// ['Coastal Storm', '#66c2a5'],
// ['Dam/Levee Break', '#abdda4'],
// ['Drought', '#e6f598'],
// ['Earthquake', '#ffffbf'],
// ['Fire', '#fee08b'],
// ['Fishing Losses', '#fdae61'],
// ['Flood', '#f46d43'],
// ['Freezing', '#d53e4f'],
// ['Human Cause', '#9a7bef'],
// ['Hurricane', '#b8fff5'],
// ['Mud/Landslide', '#fcdccf'],
// ['Other', '#ea76d3'],
// ['Severe Ice Storm', '#4f4af7'],
// ['Severe Storm(s)', '#adbddc'],
// ['Snow', '#8424d6'],
// ['Terrorist', '#3d693a'],
// ['Tornado', '#eff637'],
// ['Toxic Substances', '#fdc9fc'],
// ['Tsunami', '#41f4f6'],
// ['Typhoon', '#4188f6'],
// ['Volcano', '#cc385c']

export const defaultMapStyle = fromJS(MAP_STYLE);
