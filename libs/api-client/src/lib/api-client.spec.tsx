import { render } from '@testing-library/react';

import ApiClient from './api-client';

describe('ApiClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApiClient />);
    expect(baseElement).toBeTruthy();
  });
});
