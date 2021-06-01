/**
 * title: 可以吧
 * desc: 不可以
 */

import React from 'react';
import './index.less';

const App = () => {
  const onDragStart = e => {
    console.log('start', e);

    e.dataTransfer.setData('text', e.target.id);
  };

  const onDrop = e => {
    console.log('drop', e);

    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
  };

  const onDragEnter = e => {
    console.log('enter', e);
  };

  const onDragOver = e => {
    // console.log('over', e);

    e.preventDefault();
  };

  const onDragLeave = e => {
    console.log('leave', e);
  };

  return (
    <>
      <div className="container">
        <div
          id="destination"
          className="destination"
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        ></div>
        <div id="box" className="box" draggable="true" onDragStart={onDragStart}></div>
      </div>
    </>
  );
};

export default () => <App />;
