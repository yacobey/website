import { planRequestSchema } from "../shared/schemas";
import { generateMealPlan } from "./_lib/ai";
import { jsonEndpoint } from "./_lib/http";

export default jsonEndpoint(
  planRequestSchema,
  (input) => generateMealPlan(input),
  "Failed to generate the meal plan. Please try again."
);
