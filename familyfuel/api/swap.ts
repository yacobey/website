import { swapRequestSchema } from "../shared/schemas";
import { swapMeal } from "./_lib/ai";
import { jsonEndpoint } from "./_lib/http";

export default jsonEndpoint(
  swapRequestSchema,
  (input) => swapMeal(input),
  "Failed to suggest a replacement meal. Please try again."
);
