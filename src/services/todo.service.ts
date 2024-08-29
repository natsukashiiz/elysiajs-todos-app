import { NotFoundError } from "elysia";
import { CreateTodo, UpdateTodo } from "../models/todo.model";
import { prisma } from "../prisma";
import ResultUtils from "../utils/result.utils";

export default class TodoService {
  async getTodoList(user_id: number, page: number, limit: number) {
    const total = await prisma.todo.count({
      where: {
        user_id,
      },
    });

    if (total === 0) {
      return ResultUtils.successListEmpty();
    }

    const result = await prisma.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        user_id,
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return ResultUtils.successList(result, total);
  }

  async getTodoById(user_id: number, id: number) {
    const todo = await prisma.todo.findUnique({
      where: {
        user_id,
        id,
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    return ResultUtils.success(todo);
  }

  async createTodo(user_id: number, data: CreateTodo) {
    const result = await prisma.todo.create({
      data: {
        user_id,
        ...data,
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return ResultUtils.successWithMessage(result, "Todo created successfully");
  }

  async updateTodo(user_id: number, id: number, data: UpdateTodo) {
    const todo = await prisma.todo.findUnique({
      where: {
        user_id,
        id,
      },
    });

    if (!todo) {
    }

    const result = await prisma.todo.update({
      where: {
        user_id,
        id,
      },
      data: {
        ...data,
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return ResultUtils.successWithMessage(result, "Todo updated successfully");
  }

  async deleteTodo(user_id: number, id: number) {
    const todo = await prisma.todo.findUnique({
      where: {
        user_id,
        id,
      },
    });

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    await prisma.todo.delete({
      where: {
        user_id,
        id,
      },
    });

    return ResultUtils.successEmptyWithMessage("Todo deleted successfully");
  }
}
