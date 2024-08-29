import Elysia, { Static, t } from "elysia";
import { $Enums } from "@prisma/client";

const createTodo = t.Object({
  title: t.String({ minLength: 1, maxLength: 255 }),
  status: t.Enum($Enums.TodoStatus, { default: $Enums.TodoStatus.Todo }),
});

const updateTodo = t.Object({
  title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
  status: t.Optional(t.Enum($Enums.TodoStatus)),
});

const TodoModel = new Elysia({ name: "Model.Todo" }).model({
  "todo.create": createTodo,
  "todo.update": updateTodo,
});

export type CreateTodo = Static<typeof createTodo>;
export type UpdateTodo = Static<typeof updateTodo>;

export default TodoModel;
