import { Report, RoundInput } from './parseReport';

type Record = {
  wins: number;
  losses: number;
  draws: number;
};

export const toWins = (games: RoundInput[]) =>
  games.filter((game) => game.result === 'Win' || game.result === 'Bye').length;

export const toLosses = (games: RoundInput[]) =>
  games.filter((game) => game.result === 'Loss' || game.result === 'Double Loss').length;

export const toDraws = (games: RoundInput[]) =>
  games.filter((game) => game.result === 'Draw').length;

export const toFinalRecord = (report: Report): Record => {
  const wins = toWins(report.rounds);
  const losses = toLosses(report.rounds);
  const draws = toDraws(report.rounds);
  return { wins, losses, draws };
};

export const toFinalRecordString = (record: Record): string =>
  `${record.wins}-${record.losses}-${record.draws}`;

export const toGames = (reports: Report[]): RoundInput[] => {
  const rounds = reports.reduce((acc: RoundInput[], report): RoundInput[] => {
    return [...acc, ...report.rounds];
  }, []);
  return rounds;
};
