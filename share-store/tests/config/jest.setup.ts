import '@testing-library/dom';
import '@testing-library/jest-dom';
import '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { server } from '@/mocks/server/node';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
