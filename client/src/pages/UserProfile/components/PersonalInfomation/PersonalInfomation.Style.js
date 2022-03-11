import styled from "styled-components";

export const LayoutContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;


    @media screen and (max-width: 600px) {  
        grid-template-columns: 1fr;
    }
`;