/**
 * title: 鼠标事件示例
 * desc:
 */

import React, { MouseEvent } from 'react';
import './index.less';

class App extends React.Component {
  onMouseEnter = (e: MouseEvent) => {
    console.log('mouseenter:', e);
  };

  onMouseMove = (e: MouseEvent) => {
    console.log('mousemove:', e);
  };

  onMouseLeave = (e: MouseEvent) => {
    console.log('mouseleave:', e);
  };

  onMouseUp = (e: MouseEvent) => {
    console.log('mouseup:', e);
  };

  onMouseDown = (e: MouseEvent) => {
    console.log('mousedown:', e);
  };

  onContextMenu = (e: MouseEvent) => {
    console.log('contextmenu:', e);
  };

  onClick = (e: MouseEvent) => {
    console.log('click:', e);
  };

  onDoubleClick = (e: MouseEvent) => {
    console.log('dbclick:', e);
  };

  render() {
    return (
      <div
        className="container"
        onMouseEnter={e => this.onMouseEnter(e)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseLeave={e => this.onMouseLeave(e)}
        onMouseUp={e => this.onMouseUp(e)}
        onMouseDown={e => this.onMouseDown(e)}
        onClick={e => this.onClick(e)}
        onDoubleClick={e => this.onDoubleClick(e)}
        onContextMenu={e => this.onContextMenu(e)}
      ></div>
    );
  }
}

export default () => <App />;
