import { Table, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
    margin-top: 40px;
    margin-bottom: -30px;
`

export const WrapperTable = styled(Table)`
    & .ant-pagination {
        display: none;
    }
    // & .ant-table-container table>thead>tr:first-child >*:last-child{
    //     background: #fff5ac;
    // }
    & .ant-table-tbody{
        color: crimson;
        font-size: x-large;
        font-weight: 700;
    }
`
