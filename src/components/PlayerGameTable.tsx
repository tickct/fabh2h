import React from 'react';
import { Table } from '@mantine/core';
import { RoundInput } from '@/utils/parseReport';

type Props = {
  games: RoundInput[];
};

export const PlayerGameTable = ({ games }: Props) => {
  const rows = games.map((game) => (
    <Table.Tr key={game.eventName + game.round + game.eventDate.toLocaleString()}>
      <Table.Td>{game.eventName}</Table.Td>
      <Table.Td>{game.eventDate.toLocaleString()}</Table.Td>
      <Table.Td>{game.round}</Table.Td>
      <Table.Td>{game.rated ? 'Yes' : 'No'}</Table.Td>
      <Table.Td>{game.result}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Event Name</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Round</Table.Th>
          <Table.Th>Rated</Table.Th>
          <Table.Th>Record</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
