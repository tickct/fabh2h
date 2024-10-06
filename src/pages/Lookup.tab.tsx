import React, { useState } from 'react';
import { uniq } from 'lodash';
import { Autocomplete, Container, Stack } from '@mantine/core';
import { PlayerGameTable } from '@/components/PlayerGameTable';
import { PlayerStatCard } from '@/components/PlayerStatCard';
import { Report } from '@/utils/parseReport';
import { toGames } from '@/utils/recordHelpers';

type Props = {
  reports: Report[];
};

export const PlayerLookup = ({ reports }: Props) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const games = toGames(reports);
  const availablePlayers = uniq(games.map((round) => round.opponentName));
  const gamesAgainst = games.filter((game) => game.opponentName === selectedPlayer);
  console.log(selectedPlayer);
  return (
    <Container size="lg">
      <Stack>
        <Autocomplete
          label="Select a Player"
          placeholder="search player by name or gem Id"
          data={availablePlayers}
          limit={5}
          onOptionSubmit={(value) => setSelectedPlayer(value)}
        />
        {selectedPlayer ? (
          <>
            <PlayerStatCard games={gamesAgainst} />
            <PlayerGameTable games={gamesAgainst} />
          </>
        ) : null}
      </Stack>
    </Container>
  );
};
