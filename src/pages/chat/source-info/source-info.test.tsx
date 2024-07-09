import { promptData } from '@src/data/chat';
import { render } from '@testing-library/react';
import { SourceInfo } from './source-info';

describe('SourceInfo component', () => {
  test('should render successfully', () => {
    const { baseElement } = render(
      <SourceInfo prompt={promptData[0]} items={[]} />,
    );

    expect(baseElement).toBeTruthy();
  });
});
