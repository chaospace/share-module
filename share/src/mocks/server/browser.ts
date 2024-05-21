import { setupWorker } from 'msw/browser';
import handlers from '@/mocks/server/handlers';

export const worker = setupWorker(...handlers);