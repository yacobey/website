import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Contact from "@/pages/contact";

vi.mock("@/lib/queryClient", () => ({
  apiRequest: vi.fn(),
  queryClient: new QueryClient(),
  getQueryFn: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock("@/components/header", () => ({
  default: () => null,
}));

vi.mock("@/components/footer", () => ({
  default: () => null,
}));

vi.mock("@/components/chatbot", () => ({
  default: () => null,
}));

vi.mock("@/components/dynamic-seo", () => ({
  default: () => null,
}));

import { apiRequest } from "@/lib/queryClient";

function renderContactPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <Contact />
    </QueryClientProvider>
  );
}

async function fillContactPageForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText("John"), "Jane");
  await user.type(screen.getByPlaceholderText("Doe"), "Smith");
  await user.type(screen.getByPlaceholderText("john@business.com"), "jane@example.com");
  await user.click(screen.getByRole("button", { name: /Send Message/i }));
}

describe("Contact Page analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.open = vi.fn();
    vi.clearAllMocks();
  });

  it("fires schedule_consultation_click event when Schedule Free Consultation button is clicked", async () => {
    const user = userEvent.setup();
    renderContactPage();

    await user.click(screen.getByRole("button", { name: /Schedule Free Consultation/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "schedule_consultation_click", {
      section: "contact_page",
    });
  });

  it("fires form_submit event with contact_page section on successful form submission", async () => {
    const user = userEvent.setup();
    vi.mocked(apiRequest).mockResolvedValueOnce(new Response(null, { status: 200 }));

    renderContactPage();
    await fillContactPageForm(user);

    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("event", "form_submit", {
        section: "contact_page",
      });
    });
  });

  it("fires form_error event with contact_page section when form submission fails", async () => {
    const user = userEvent.setup();
    vi.mocked(apiRequest).mockRejectedValueOnce(new Error("Network error"));

    renderContactPage();
    await fillContactPageForm(user);

    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("event", "form_error", {
        section: "contact_page",
      });
    });
  });
});
