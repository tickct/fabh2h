import React from 'react';
import { Paper, Text, Title } from '@mantine/core';
import { RoundInput } from '@/utils/parseReport';
import { toDraws, toLosses, toWins } from '@/utils/recordHelpers';

type Props = {
  games: RoundInput[];
};

const toPlayerStats = (games: RoundInput[]) => ({
  name: games[0]?.opponentName,
  timesPlayed: games.length,
  record: {
    wins: toWins(games),
    losses: toLosses(games),
    draws: toDraws(games),
  },
});
export const PlayerStatCard = ({ games }: Props) => {
  if (!games.length) {
    return null;
  }
  const playerStats = toPlayerStats(games);

  return (
    <Paper>
      <Title>{playerStats.name}</Title>
      <Text>Games Played: {playerStats.timesPlayed}</Text>
      <Text>
        Win Percentage: {Math.round((100 * playerStats.record.wins) / playerStats.timesPlayed)}%
      </Text>
      <Text>
        Record: W {playerStats.record.wins} - L {playerStats.record.losses} - D{' '}
        {playerStats.record.draws} D
      </Text>
    </Paper>
  );
};
