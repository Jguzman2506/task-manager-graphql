import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TasksService {
  // Simularemos una base de datos en la memoria usando un arreglo
  private tasks: Task[] = [];

  // Método para devolver todas las tareas guardadas
  findAll(): Task[] {
    return this.tasks;
  }

  // Método para procesar y crear una tarea nueva
  create(createTaskInput: CreateTaskInput): Task {
    const newTask: Task = {
      id: Date.now().toString(), // Generamos un ID rápido usando la fecha exacta
      title: createTaskInput.title,
      description: createTaskInput.description,
      status: 'PENDING', // Regla de negocio: Toda tarea nueva inicia como PENDIENTE
    };

    this.tasks.push(newTask);
    return newTask;
  }
}