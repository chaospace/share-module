import "@testing-library/dom";
import "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { server } from "@/mocks/node";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
});

afterAll(() => {
    server.close();
})