import { DateTime } from 'luxon';
import { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

export type Report = {
  eventName: string;
  eventDate: DateTime;
  rated: boolean;
  id: string;
  rounds: RoundInput[];
};

export type RoundInput = {
  eventName: string;
  eventDate: DateTime;
  rated: boolean;
  round: number;
  opponentName: string;
  result: string;
};

// FabTCG doesn't use standard Abbreviations
const MonthMap: { [month: string]: string } = {
  'Jan.': 'Jan',
  'Feb.': 'Feb',
  March: 'Mar',
  April: 'Apr',
  'May.': 'May',
  June: 'Jun',
  July: 'Jul',
  'Aug.': 'Aug',
  'Sept.': 'Sep',
  'Oct.': 'Oct',
  'Nov.': 'Nov',
  'Dec.': 'Dec',
};

const toLuxonTime = (eventTime: string): string => {
  if (eventTime === 'noon') {
    return '12:00 PM';
  }
  const [time, meridiem] = eventTime.split(' ');
  //times without minutes omit them
  const formattedTime = time.includes(':') ? time : `${time}:00`;
  return `${formattedTime} ${meridiem
    .split('.')
    .filter((x: string) => x)
    .map((x: string) => x.toUpperCase())
    .join('')}`;
};

const toDateReformat = (eventDate: string): string => {
  const [month, day] = eventDate.split(' ');
  return `${MonthMap[month] || month} ${day}`;
};

const toFormattedDate = (eventDate: string): DateTime => {
  const [date, year, time] = eventDate.split(',').map((x) => x.trim());
  const luxDate = DateTime.fromFormat(
    `${toDateReformat(date)} ${year} ${toLuxonTime(time)}`,
    'MMM d yyyy t'
  );
  if (luxDate.invalidReason) {
    notifications.show({ message: 'Line Parse Error: Date' });
  }
  return luxDate;
};

const LINE_REGEX = /"(.+?)","(.+?)","(.+?)",(\d),"(.+?)","(.+?)"/;
export const parseReport = async (file: FileWithPath): Promise<Report[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const [_headers, ...data] = reader.result.split('\n');
        const eventRounds = data.map((line): RoundInput => {
          const [_full, eventName, eventDate, rated, round, opponentName, result] =
            line.match(LINE_REGEX) || [];
          if (!_full) {
            notifications.show({ message: 'Line Parse Error' });
          }
          const date = toFormattedDate(eventDate);
          return {
            eventName,
            eventDate: date,
            rated: rated === 'yes',
            round: Number(round),
            opponentName,
            result,
          };
        });
        const eventReports: Report[] = Object.values(
          eventRounds.reduce(
            (report: { [key: string]: Report }, eventRound): { [key: string]: Report } => {
              const key = eventRound.eventDate.toLocaleString() + eventRound.eventName;
              return {
                ...report,
                [key]: {
                  id: key,
                  eventName: eventRound.eventName,
                  eventDate: eventRound.eventDate,
                  rated: eventRound.rated,
                  rounds: [...(report[key]?.rounds || []), eventRound],
                },
              };
            },
            {}
          )
        );
        resolve(eventReports);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });
};
