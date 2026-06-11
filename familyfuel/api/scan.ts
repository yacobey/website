import { scanRequestSchema } from "../shared/schemas";
import { scanInventoryImages } from "./_lib/ai";
import { jsonEndpoint } from "./_lib/http";

export default jsonEndpoint(
  scanRequestSchema,
  ({ images }) => scanInventoryImages(images),
  "Failed to analyze the photos. Please try again."
);
