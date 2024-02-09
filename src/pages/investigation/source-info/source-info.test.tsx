import { render } from '@testing-library/react';
import { SourceInfo } from './source-info';

describe('SourceInfo component', () => {
  test('should render successfully', () => {
    const { baseElement } = render(<SourceInfo promptId="1" items={[]} />);

    expect(baseElement).toBeTruthy();
  });
});
