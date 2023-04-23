import React from "react";
import { classNames } from "../../utils/functions/utils";

interface TableProps {
    children: React.ReactNode;
    className?: string;
}

function Table(props: TableProps) {
    return (
        <table className={classNames("w-full table-auto", props.className)}>
            {props.children}
        </table>
    );
}

interface TbodyProps {
    children: React.ReactNode;
    className?: string;
}

function Tbody(props: TbodyProps) {
    return (
        <tbody
            className={classNames(
                "block w-full sm:table-row-group",
                props.className
            )}
        >
            {props.children}
        </tbody>
    );
}

interface TdProps {
    children: React.ReactNode;
    className?: string;
}

function Td(props: TdProps) {
    return (
        <td
            className={classNames(
                props.className,
                "block sm:table-cell h-[60px] pt-[18px] pb-[18px] pl-[16px] pr-[16px] bg-white text-body3/regular text-gray-900 relative text-right sm:text-left before:content-['Receivable_amount'] sm:before:hidden before:absolute before:left-2 before:text-body3/medium before:text-gray-500"
            )}
        >
            {props.children}
        </td>
    );
}

interface ThProps {
    children: React.ReactNode;
    className?: string;
}

function Th(props: ThProps) {
    return (
        // className="h-[40px] w-[39%] text-left text-label/medium text-gray-500 pt-[13px] pb-[13px] pr-[16px] bg-white"
        <th
            className={classNames(
                "h-[40px] w-[30.5%] text-left text-label/medium text-gray-500 pt-[13px] pb-[13px] pl-[16px] pr-[16px] bg-white",
                props.className
            )}
        >
            {props.children}
        </th>
    );
}

interface TheadProps {
    children: React.ReactNode;
    className?: string;
}

function Thead(props: TheadProps) {
    return (
        <thead className="w-full border-b-[1px] border-gray-100 hidden sm:table-header-group">
            {props.children}
        </thead>
    );
}

interface TrProps {
    children: React.ReactNode;
    className?: string;
}

function Tr(props: TrProps) {
    return (
        <tr
            className={classNames(
                "block sm:table-row border-[2px] border-gray-500 mb-2 rounded-md p-1 sm:p-0 sm:border-none",
                props.className
            )}
        >
            {props.children}
        </tr>
    );
}

export { Table, Tbody, Td, Th, Thead, Tr };
