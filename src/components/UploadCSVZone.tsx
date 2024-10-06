import React, { useState } from 'react';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Group, rem, Text } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { parseReport, Report } from '@/utils/parseReport';

type Props = {
  onFileSelect: (reports: Report[]) => void;
};

export const UploadCVSZone = ({ onFileSelect }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (files: FileWithPath[]) => {
    setLoading(true);
    const results = await parseReport(files[0]);
    onFileSelect(results);
    setLoading(false);
  };
  return (
    <Dropzone
      onDrop={handleFileUpload}
      onReject={(fileRejections) =>
        notifications.show({
          title: 'Upload Failed',
          message: fileRejections[0].errors.join(' '),
        })
      }
      maxSize={5 * 1024 ** 2}
      maxFiles={1}
      accept={[MIME_TYPES.csv]}
      multiple={false}
      loading={loading}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag Match History click to select file
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
