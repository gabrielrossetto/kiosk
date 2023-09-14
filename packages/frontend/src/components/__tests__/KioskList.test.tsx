import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KioskList from '../KioskList';
import { RecoilRoot } from 'recoil';

test('renders KioskList', () => {
  const { getByText } = render(
    <RecoilRoot>
      <KioskList />
    </RecoilRoot>
  );
  expect(getByText("Kiosk List")).toBeInTheDocument();
  expect(getByText("Add Kiosk")).toBeInTheDocument();
});