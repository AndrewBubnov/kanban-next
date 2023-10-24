import { columns } from '@/constants';
import { Status } from '@/types';

export const sortColumns = (a: Status, b: Status) => columns.indexOf(a) - columns.indexOf(b);
