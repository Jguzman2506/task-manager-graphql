import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

// Registramos el ENUM para que GraphQL lo reconozca como tipo válido
registerEnumType(TaskStatus, { name: 'TaskStatus' });

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => TaskStatus)
  status!: TaskStatus;

  @Field(() => [String])
  tags!: string[];

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  assignedUser?: string;

  @Field()
  projectId!: string;
}