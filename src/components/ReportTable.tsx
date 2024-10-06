import { Report } from '@/utils/parseReport';
import { toFinalRecord, toFinalRecordString } from '@/utils/recordHelpers';
import { Table } from '@mantine/core';
import React from 'react';

type Props = {
    reports: Report[]
};

export const ReportTable = ({ reports}: Props) => {
    const rows = reports.map((report) => (
        <Table.Tr key={report.id}>
          <Table.Td>{report.eventName}</Table.Td>
          <Table.Td>{report.eventDate.toLocaleString()}</Table.Td>
          <Table.Td>{toFinalRecordString(toFinalRecord(report))}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Event Name</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Record</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}