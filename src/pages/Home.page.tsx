import { useState } from 'react';
import { Container, Tabs } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReportTable } from '@/components/ReportTable';
import { UploadCVSZone } from '@/components/UploadCSVZone';
import { Report } from '@/utils/parseReport';
import { FunStats } from './FunStats.page';
import { PlayerLookup } from './Lookup.tab';

export function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  return (
    <>
      <Notifications position="top-center" />
      <Container size="lg">
        <UploadCVSZone onFileSelect={(reports) => setReports(reports)} />
      </Container>
      <Container size="lg">
        <Tabs defaultValue="Overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="events">Events</Tabs.Tab>
            <Tabs.Tab value="lookup">Player Lookup</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="events">
            <ReportTable reports={reports} />
          </Tabs.Panel>
          <Tabs.Panel value="lookup">
            <PlayerLookup reports={reports} />
          </Tabs.Panel>
          <Tabs.Panel value="overview">
            <FunStats reports={reports} />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
