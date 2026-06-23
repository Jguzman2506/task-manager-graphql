import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Crea una nueva tarea y le asigna un ID único y la fecha actual.
   */
  create(createTaskInput: CreateTaskInput): Task {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
      ...createTaskInput,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Retorna todas las tareas registradas.
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Busca una tarea por su ID. Lanza un error 404 si no existe.
   */
  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  /**
   * Actualiza los campos recibidos en una tarea existente de forma dinámica.
   */
  update(id: string, updateInput: Partial<CreateTaskInput>): Task {
    const task = this.findOne(id);
    Object.assign(task, updateInput);
    return task;
  }

  /**
   * Elimina una tarea por ID. Retorna true si fue borrada con éxito.
   */
  remove(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < initialLength;
  }
}