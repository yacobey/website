import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/hero";

vi.mock("@/hooks/use-business-config", () => ({
  useBusinessConfig: () => ({
    data: { links: { calendly: "https://calendly.com/test/30min" } },
  }),
}));

vi.mock("@assets/generated_images/Professional_business_consultation_meeting_dd13ce9b.png", () => ({
  default: "mocked-image.png",
}));

describe("Hero analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    window.open = vi.fn();
    vi.clearAllMocks();
  });

  it("fires schedule_consultation_click event with hero section when consultation button is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const button = screen.getByTestId("button-schedule-consultation");
    await user.click(button);

    expect(window.gtag).toHaveBeenCalledWith("event", "schedule_consultation_click", {
      section: "hero",
    });
  });

  it("fires get_in_touch_click event with hero section when get in touch button is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const button = screen.getByTestId("button-get-in-touch");
    await user.click(button);

    expect(window.gtag).toHaveBeenCalledWith("event", "get_in_touch_click", {
      section: "hero",
    });
  });

  it("opens the calendly URL in a new tab when schedule consultation is clicked", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const button = screen.getByTestId("button-schedule-consultation");
    await user.click(button);

    expect(window.open).toHaveBeenCalledWith("https://calendly.com/test/30min", "_blank");
  });

  it("does not fire analytics on initial render", () => {
    render(<Hero />);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
