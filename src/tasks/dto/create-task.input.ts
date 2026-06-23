import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../entities/task.entity';

@InputType()
export class CreateTaskInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.BACKLOG })
  status!: TaskStatus;

  @Field(() => [String], { defaultValue: [] })
  tags!: string[];

  @Field({ nullable: true })
  assignedUser?: string;

  @Field()
  projectId!: string;
}