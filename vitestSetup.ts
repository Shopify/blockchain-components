import createFetchMock from 'vitest-fetch-mock';
import {vi} from 'vitest';

const fetchMock = createFetchMock(vi);

// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
fetchMock.enableMocks();

// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock();
