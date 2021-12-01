/**
 * title: Blob Url
 * desc: Blob URL 可以通过 URL.createObjectURL(blob) 创建，在绝大部分场景下，我们可以像使用 HTTP 协议的 URL 一样，使用 Blob URL
 */

import React from 'react';
import './index.less';

class App extends React.Component {
  state = {
    blobUrl: null
  }

  onChange(e) {
    const files = e.target.files;
    const file = files[0];
    const blobUrl = URL.createObjectURL(file);

    console.log(blobUrl);

    this.setState({ blobUrl });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange.bind(this)} />
        <div style={{ marginTop: 16 }}>
          Blobl Url: { this.state.blobUrl }
        </div>
      </div>
    );
  }
}

export default () => <App />;
