/** Liveness probe for the container healthcheck and Coolify. */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
