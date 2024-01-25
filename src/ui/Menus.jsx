import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import propTypes from "prop-types";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openedMenu, setOpenedMenu] = useState(null);
  const [position, setPosition] = useState();

  const open = (id) => setOpenedMenu(id);
  const close = () => setOpenedMenu(null);
  return (
    <div>
      <MenusContext.Provider
        value={{ openedMenu, open, close, position, setPosition }}
      >
        {children}
      </MenusContext.Provider>
    </div>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ children, id }) {
  const { open, close, openedMenu, setPosition } = useContext(MenusContext);
  const handleClick = (e) => {
    e.stopPropagation();
    openedMenu !== id || openedMenu === null ? open(id) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    const position = {
      x: window.innerWidth - rect.right - rect.width,
      y: rect.y + rect.height + 10,
    };
    setPosition(position);
  };
  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function List({ children, id }) {
  const { openedMenu, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close,false);
  if (openedMenu !== id) return null;

  return createPortal(
    <StyledList position={position} id={id} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        <span>{icon}</span>
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

Menus.propTypes = {
  children: propTypes.node.isRequired,
};

Menu.propTypes = {
  children: propTypes.node.isRequired,
};

Toggle.propTypes = {
  children: propTypes.node.isRequired,
  id: propTypes.number.isRequired,
};

List.propTypes = {
  children: propTypes.node.isRequired,
  id: propTypes.number.isRequired,
};

Button.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  icon: propTypes.node,
};

export default Menus;
