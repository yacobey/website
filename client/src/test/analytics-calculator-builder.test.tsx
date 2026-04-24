import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import CalculatorBuilder from "@/components/calculator-builder";

describe("Calculator Builder analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function generateCalculator(prompt: string) {
    fireEvent.change(
      screen.getByPlaceholderText(/Example: I need a loan payment calculator/i),
      { target: { value: prompt } }
    );
    fireEvent.click(screen.getByRole("button", { name: /Generate Calculator/i }));
    await act(async () => {
      vi.runAllTimers();
    });
  }

  it("fires calculator_use event with custom_calculator action and calculator name when Calculate is clicked", async () => {
    render(<CalculatorBuilder />);

    await generateCalculator("loan payment calculator");

    fireEvent.change(screen.getByPlaceholderText("50000"), { target: { value: "100000" } });
    fireEvent.change(screen.getByPlaceholderText("5.5"), { target: { value: "5" } });
    fireEvent.change(screen.getByPlaceholderText("30"), { target: { value: "30" } });

    fireEvent.click(screen.getByRole("button", { name: /^Calculate$/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "custom_calculator",
      name: "Loan Payment Calculator",
    });
  });

  it("fires calculator_use event with the correct name for the ROI calculator", async () => {
    render(<CalculatorBuilder />);

    await generateCalculator("ROI return on investment");

    fireEvent.change(screen.getByPlaceholderText("10000"), { target: { value: "5000" } });
    fireEvent.change(screen.getByPlaceholderText("12000"), { target: { value: "7000" } });
    fireEvent.change(screen.getByPlaceholderText("2"), { target: { value: "3" } });

    fireEvent.click(screen.getByRole("button", { name: /^Calculate$/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "custom_calculator",
      name: "ROI Calculator",
    });
  });

  it("fires calculator_use event with the correct name for the default custom calculator", async () => {
    render(<CalculatorBuilder />);

    await generateCalculator("profit margin calculator");

    fireEvent.change(screen.getByPlaceholderText("1000"), { target: { value: "800" } });
    fireEvent.change(screen.getByPlaceholderText("500"), { target: { value: "200" } });
    fireEvent.change(screen.getByPlaceholderText("10"), { target: { value: "20" } });

    fireEvent.click(screen.getByRole("button", { name: /^Calculate$/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "custom_calculator",
      name: "Custom Financial Calculator",
    });
  });

  it("does not fire calculator_use analytics before a calculator is generated", () => {
    render(<CalculatorBuilder />);

    expect(screen.queryByRole("button", { name: /^Calculate$/i })).not.toBeInTheDocument();
    expect(window.gtag).not.toHaveBeenCalledWith("event", "calculator_use", expect.anything());
  });
});
