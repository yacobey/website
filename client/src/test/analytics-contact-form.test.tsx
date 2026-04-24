import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContactForm from "@/components/contact-form";

vi.mock("@/lib/queryClient", () => ({
  apiRequest: vi.fn(),
  queryClient: new QueryClient(),
  getQueryFn: vi.fn(),
}));

vi.mock("@/hooks/use-business-config", () => ({
  useBusinessConfig: () => ({ data: null }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

import { apiRequest } from "@/lib/queryClient";

function renderWithQueryClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

async function fillAndSubmitForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/First Name/i), "Jane");
  await user.type(screen.getByPlaceholderText(/Last Name/i), "Doe");
  await user.type(screen.getByPlaceholderText(/Email/i), "jane@example.com");
  await user.type(screen.getByPlaceholderText(/Tell us about your business/i), "Hello!");
  await user.click(screen.getByRole("button", { name: /Send Message/i }));
}

describe("Contact Form analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    vi.clearAllMocks();
  });

  it("fires form_submit event with contact_form section on successful submission", async () => {
    const user = userEvent.setup();
    vi.mocked(apiRequest).mockResolvedValueOnce(new Response(null, { status: 200 }));

    renderWithQueryClient(<ContactForm />);
    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("event", "form_submit", {
        section: "contact_form",
      });
    });
  });

  it("fires form_error event with contact_form section when submission fails", async () => {
    const user = userEvent.setup();
    vi.mocked(apiRequest).mockRejectedValueOnce(new Error("Network error"));

    renderWithQueryClient(<ContactForm />);
    await fillAndSubmitForm(user);

    await waitFor(() => {
      expect(window.gtag).toHaveBeenCalledWith("event", "form_error", {
        section: "contact_form",
      });
    });
  });

  it("does not fire analytics when the form is not submitted", () => {
    renderWithQueryClient(<ContactForm />);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
