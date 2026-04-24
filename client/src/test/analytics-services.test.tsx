import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Services from "@/components/services";

describe("Services analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    vi.clearAllMocks();
  });

  it("fires book_call_click event with services section and correct service name for first service", async () => {
    const user = userEvent.setup();
    render(<Services />);

    const bookCallButtons = screen.getAllByRole("button", { name: /Book a call/i });
    await user.click(bookCallButtons[0]);

    expect(window.gtag).toHaveBeenCalledWith("event", "book_call_click", {
      section: "services",
      service: "Bookkeeping & Accounting",
    });
  });

  it("fires book_call_click event with services section and correct service name for second service", async () => {
    const user = userEvent.setup();
    render(<Services />);

    const bookCallButtons = screen.getAllByRole("button", { name: /Book a call/i });
    await user.click(bookCallButtons[1]);

    expect(window.gtag).toHaveBeenCalledWith("event", "book_call_click", {
      section: "services",
      service: "Tax Planning & Strategy",
    });
  });

  it("fires book_call_click event with services section and correct service name for third service", async () => {
    const user = userEvent.setup();
    render(<Services />);

    const bookCallButtons = screen.getAllByRole("button", { name: /Book a call/i });
    await user.click(bookCallButtons[2]);

    expect(window.gtag).toHaveBeenCalledWith("event", "book_call_click", {
      section: "services",
      service: "AI Consultancy & Financial Tools",
    });
  });

  it("renders three Book a call buttons, one per service", () => {
    render(<Services />);
    const buttons = screen.getAllByRole("button", { name: /Book a call/i });
    expect(buttons).toHaveLength(3);
  });

  it("does not fire analytics on initial render", () => {
    render(<Services />);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
