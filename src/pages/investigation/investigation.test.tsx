import { act, render } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Investigation } from './investigation';

describe('Investigation', () => {
  const componentWrapper = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Investigation />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  // // ... rest of your tests

  // test('renders without crashing', () => {
  //   render(
  //     <RecoilRoot>
  //       <Investigation />
  //     </RecoilRoot>,
  //   );
  // });

  // test('calls getItem when id is present', async () => {
  //   const getItem = jest.fn();
  //   useApi.mockReturnValue({
  //     getItem,
  //     item: null,
  //     loading: false,
  //   });

  //   act(() => {
  //     render(
  //       <RecoilRoot>
  //         <Investigation />
  //       </RecoilRoot>,
  //     );
  //   });

  //   await waitFor(() => expect(getItem).toHaveBeenCalledWith('testId'));
  // });

  // test('sets current investigation when item is present', async () => {
  //   useApi.mockReturnValue({
  //     getItem: jest.fn(),
  //     items: null,
  //     loading: false,
  //     completions: undefined,
  //   });
  // });

  test('should render successfully', async () => {
    const { baseElement } = render(componentWrapper);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });
});
