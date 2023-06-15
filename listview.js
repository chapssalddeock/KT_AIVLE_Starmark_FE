const React = require('react');

function Sidebar() {
  // 채팅 목록
  const listItems = ['1', '2'];

  return React.createElement(
    'div',
    { style: { border: 'solid 1px black' } },
    React.createElement(
      'ul',
      null,
      listItems.map((item, index) =>
        React.createElement('li', { key: index }, item)
      )
    )
  );
}

module.exports = Sidebar;
