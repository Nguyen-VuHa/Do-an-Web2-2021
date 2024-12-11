import { ReactNode } from 'react';

export interface HeaderTable {
  id: number;
  label: string;
  key: string;
  extendsion?: (props: any) => ReactNode;
}
