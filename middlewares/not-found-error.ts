import { Status, Context } from "https://deno.land/x/oak/mod.ts";
const notFound = async (ctx: Context) => {
  ctx.response.status = Status.NotFound;
  ctx.response.body = {
    status: 404,
    message:
      `Path ${ctx.request.url} not found for method ${ctx.request.method}`,
  };
};

export default notFound;
