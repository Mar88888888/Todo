import { registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export enum Status {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CALNCELED = 'Canceled',
}

registerEnumType(Status, {
  name: 'Status', 
});

export function isValidStatus(status: string): boolean {
  return Object.values(Status).includes(status as Status);
}