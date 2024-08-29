import Elysia, { Static, t } from "elysia";

const pagination = t.Object({
  page: t.Number({ min: 1, default: 1, readOnly: true }),
  limit: t.Number({ min: 1, max: 100, default: 10, readOnly: true }),
});

const PaginationModel = new Elysia({ name: "Model.Pagination" }).model({
  pagination,
});

export type Pagination = Static<typeof pagination>;

export default PaginationModel;
