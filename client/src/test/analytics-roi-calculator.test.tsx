import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ROICalculator from "@/components/calculators/roi-calculator";

describe("ROI Calculator analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("fires calculator_use event with roi_calculator action when Calculate ROI is clicked", async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.type(screen.getByLabelText(/Initial Investment Amount/i), "10000");
    await user.type(screen.getByLabelText(/Current\/Final Value/i), "12000");

    await user.click(screen.getByRole("button", { name: /Calculate ROI/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "roi_calculator",
      investment: "10k",
    });
  });

  it("does not fire analytics when initial investment is zero or empty", async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.type(screen.getByLabelText(/Current\/Final Value/i), "12000");

    const button = screen.getByRole("button", { name: /Calculate ROI/i });
    expect(button).toBeDisabled();
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("sends the investment amount formatted in thousands", async () => {
    const user = userEvent.setup();
    render(<ROICalculator />);

    await user.type(screen.getByLabelText(/Initial Investment Amount/i), "50000");
    await user.type(screen.getByLabelText(/Current\/Final Value/i), "70000");

    await user.click(screen.getByRole("button", { name: /Calculate ROI/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "roi_calculator",
      investment: "50k",
    });
  });
});
