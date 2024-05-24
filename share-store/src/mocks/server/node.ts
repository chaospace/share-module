import { setupServer } from 'msw/node';
import handlers from '@/mocks/server/handlers';

export const server = setupServer(...handlers);
