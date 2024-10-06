import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import { Report, RoundInput } from '@/utils/parseReport';
import { toDraws, toGames, toLosses, toWins } from '@/utils/recordHelpers';
import styles from './FunStats.module.css';

type Props = {
  reports: Report[];
};

const toMaxPlayed = (games: RoundInput[]) => {
  const countPlayed = games.reduce((acc: { [key: string]: number }, game) => {
    const count = (acc[game.opponentName] || 0) + 1;
    return {
      ...acc,
      [game.opponentName]: count,
    };
  }, {});
  return Object.entries(countPlayed).reduce(
    ([maxName, maxCount], [name, count]) =>
      count > maxCount ? [name, count] : [maxName, maxCount],
    ['unknown', 0]
  );
};
export const FunStats = ({ reports }: Props) => {
  const games = toGames(reports);
  const maxPlayed = toMaxPlayed(games);
  return (
    <Card withBorder className={styles.container}>
      <Title>Overview</Title>
      <Card.Section withBorder inheritPadding style={{ padding: 16 }}>
        <Text>Total Games: {games.length} </Text>
        <Text>Total Wins: {toWins(games)} </Text>
        <Text>Total Losses: {toLosses(games)} </Text>
        <Text>Total Draws: {toDraws(games)} </Text>
        <Text>Total Win Percentage: {Math.round((100 * toWins(games)) / games.length)}%</Text>
      </Card.Section>
      <Card.Section withBorder inheritPadding style={{ padding: 16 }}>
        <Text>
          Most Played Opponent: {maxPlayed[0]} - {maxPlayed[1]} Games
        </Text>
      </Card.Section>
    </Card>
  );
};
