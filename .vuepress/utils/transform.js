module.exports = arr => {
  return arr.map(item => {
    if (item && item.children) {
      return {
        title: item.title,
        collapsable: item.collapsable ? item.collapsable : false,
        children: item.children.map(child => {
          const seq = item.link === '/' || item.link === '' || item.link === undefined ? '' : '/';
          return [`${item.link}${seq}${child.link}`, child.title];
        }),
      };
    }
    return [item.link, item.title];
  });
};
