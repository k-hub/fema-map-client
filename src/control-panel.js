import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
        <div className="title">Disasters That Occurred In <div className="title year">{settings.year}</div></div>
        <p>Map showing disasters by state. Hover the state to see details.</p>

        <div>Data source:
          <a href="https://www.fema.gov/media-library/assets/documents/28318"
            target="_blank"
            rel="noopener noreferrer"> FEMA Disaster Declarations</a>
        </div>

        <div className="input">
          <label>Year</label>
          <input type="range" value={settings.year}
            min={1953} max={2018} step={1}
            onChange={evt => this.props.onChange('year', evt.target.value)}
          />
        </div>
      </Container>
    );
  }
}
