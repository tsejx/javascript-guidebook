function normalize(arr, prefixPath) {
  return arr.map((item, index, arr) => {
    if (item && item.children) {
      return {
        title: item.title,
        collapsable: item.collapsable ? item.collapsable : false,
        children: normalize(item.children, item.link),
      };
    }
    const seq = item.link === '/' || item.link === '' || item.link === undefined ? '' : '/';

    const link = prefixPath ? `${prefixPath}/${item.link}` : `${item.link}`;

    return [link, item.title];
  });
}

module.exports = normalize;
