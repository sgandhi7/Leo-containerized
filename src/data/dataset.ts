import { Dataset } from '@src/types/dataset';

export const datasets: Dataset[] = [
  {
    id: '1',
    value: 'document',
    display_name: '9/11 Commission',
    description: '9/11 Commission report data',
    is_active: true,
  },
  {
    id: '2',
    value: 'gdelt',
    display_name: 'GDELT',
    description: 'GDELT data',
    is_active: true,
  },
  {
    id: '3',
    value: 'audio',
    display_name: 'Audio',
    description: '9/11 Commission report audio data',
    is_active: true,
  },
  {
    id: '4',
    value: 'Image',
    display_name: 'Image',
    description: '9/11 Commission report image data',
    is_active: false,
  },
];
