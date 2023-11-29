import styled from "styled-components"
import MainNav from "./MainNav"
import Logo from "./Logo"
const StyledSideBar = styled.aside`
    background-color: var(--color-grey-0);
    grid-row: 1/-1;
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    `;

function SideBar() {
    return (
        <StyledSideBar>
            <Logo />
            <MainNav />
        </StyledSideBar>
    )
}

export default SideBar
