import React, {PureComponent} from 'react';

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;
    const {settings} = this.props;

    return (
      <Container>
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
