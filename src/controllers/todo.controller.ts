import Elysia, { t } from "elysia";
import PaginationModel from "../models/pagination.model";
import TodoModel from "../models/todo.model";
import AuthMiddleware from "../middlewares/auth.middleware";
import TodoService from "../services/todo.service";

const TodoController = new Elysia({ prefix: "/v1/todos" })
  .use(TodoModel)
  .use(PaginationModel)
  .use(AuthMiddleware)
  .decorate({
    todoService: new TodoService(),
  })
  .get(
    "",
    async ({ user, query: { page, limit }, todoService }) => {
      return todoService.getTodoList(user.id, page, limit);
    },
    {
      query: "pagination",
      detail: { tags: ["Todos"], security: [{ JwtAuth: [] }] },
    }
  )
  .get(
    "/:id",
    async ({ user, params, todoService }) => {
      return todoService.getTodoById(user.id, params.id);
    },
    {
      params: t.Object({ id: t.Number() }),
      detail: { tags: ["Todos"], security: [{ JwtAuth: [] }] },
    }
  )
  .post(
    "",
    async ({ user, body, todoService }) => {
      return todoService.createTodo(user.id, body);
    },
    {
      body: "todo.create",
      detail: { tags: ["Todos"], security: [{ JwtAuth: [] }] },
    }
  )
  .put(
    "/:id",
    async ({ user, params, body, todoService }) => {
      return todoService.updateTodo(user.id, params.id, body);
    },
    {
      params: t.Object({ id: t.Number() }),
      body: "todo.update",
      detail: { tags: ["Todos"], security: [{ JwtAuth: [] }] },
    }
  )
  .delete(
    "/:id",
    async ({ user, params, todoService }) => {
      return todoService.deleteTodo(user.id, params.id);
    },
    {
      params: t.Object({ id: t.Number() }),
      detail: { tags: ["Todos"], security: [{ JwtAuth: [] }] },
    }
  );

export default TodoController;
