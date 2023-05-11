import type {Condition} from './condition';

export interface Requirements {
  conditions: Condition[];
  logic: 'ANY' | 'ALL';
}
