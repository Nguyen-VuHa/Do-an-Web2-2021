import { BlueGray, GrayWhite, Green, YellowGray } from "src/contants/cssContants";
import styled from "styled-components";

export const LayoutTable = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    height: auto;

    padding: 0;
    margin: 0;
    color: ${YellowGray};
`;

export const HeaderTable = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;

    width: 100%;
    height: 42px;
    border-bottom: 4px solid ${Green};

    font-weight: 600;
`;

export const TitleTable = styled.div`
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;

    font-size: 20px;
    line-height: 27px;

    display: flex;
    align-items: center;

    letter-spacing: 0.002em;
    color: #acacac;
`;

export const ContentTable = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;
    list-style: none;

    color: ${GrayWhite};
`;

export const ItemTable = styled.li`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid ${YellowGray};

    &:hover {
        ${(props) => (props.hover === true ? "background: #fff6f6;" : "")}
    }
`;

export const Cell = styled.div`
    width: ${(props) => props.width}px;
    min-height: 50px;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 8px;
`;

export const EmptyDataTable = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 24px 0px;

    width: 100%;
    height: 400px;

    margin: 24px 0px;

    span {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;

        width: auto;

        display: flex;
        align-items: center;
        letter-spacing: 0.002em;

        margin-top: 10px;
    }
`;

export const ImageDefault = styled.div`
    width: 240px;
    height: 200px;
    background-image: url("${(props) => props.url}");
    background-size: cover;
`;