const React = require('react');
const { useState } = require('react');
const useRouter = require('next/router').useRouter;
const Container = require('react-bootstrap/Container');
const Nav = require('react-bootstrap/Nav');
const Navbar = require('react-bootstrap/Navbar');
const { FiBell, FiMenu } = require('react-icons/fi');

function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const moveToAboutPage = () => {
    router.push('/about');
  };

  return React.createElement(
    'div',
    { style: { border: 'solid 1px black' } },
    React.createElement(
      Navbar,
      null,
      React.createElement(
        Container,
        null,
        React.createElement('img', {
          src: require('C:\\Users\\User\\Desktop\\StarMark_front\\bigproject\\public\\img\\menu.png'),
          width: 60,
          height: 60,
          onClick: toggleMenu,
        }),
        React.createElement(
          Navbar.Brand,
          { onClick: moveToAboutPage },
          '네비게이션 바 영역'
        ),
        React.createElement(
          Nav,
          null,
          React.createElement(
            Nav.Link,
            null,
            React.createElement(FiBell, null),
            ' ',
            React.createElement(FiMenu, { onClick: toggleMenu })
          )
        )
      )
    ),
    isMenuOpen &&
      React.createElement(
        'div',
        { style: { background: '#f5f5f5', padding: '10px' } },
        React.createElement('p', null, 'Menu')
      ),
    !isMenuOpen &&
      React.createElement(
        'div',
        { style: { background: '#f5f5f5', padding: '10px' } },
        React.createElement('img', {
          src: require('C:\\Users\\User\\Desktop\\StarMark_front\\bigproject\\public\\img\\about.png'),
          width: 60,
          height: 60,
          onClick: moveToAboutPage,
        })
      )
  );
}

module.exports = NavBar;
