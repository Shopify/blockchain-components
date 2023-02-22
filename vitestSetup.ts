import matchers from '@testing-library/jest-dom';
import {vi} from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

// Adds the jest-dom matchers from testing library
expect.extend(matchers);

const fetchMock = createFetchMock(vi);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMock.enableMocks();

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();
