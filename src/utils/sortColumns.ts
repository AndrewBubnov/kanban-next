import { columns } from '@/constants';

export const sortColumns = (a: string, b: string) => columns.indexOf(a) - columns.indexOf(b);
