import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaxCalculator from "@/components/calculators/tax-calculator";

describe("Tax Calculator analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("fires calculator_use event with tax_calculator action when Calculate Taxes is clicked", async () => {
    const user = userEvent.setup();
    render(<TaxCalculator />);

    await user.type(screen.getByLabelText(/Annual Gross Income/i), "75000");

    const [filingStatusTrigger] = screen.getAllByRole("combobox");
    await user.click(filingStatusTrigger);
    await user.click(screen.getByRole("option", { name: /Single/i }));

    await user.click(screen.getByRole("button", { name: /Calculate Taxes/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "tax_calculator",
      income: "70k",
    });
  });

  it("sends income formatted by flooring to nearest 10k", async () => {
    const user = userEvent.setup();
    render(<TaxCalculator />);

    await user.type(screen.getByLabelText(/Annual Gross Income/i), "120000");

    const [filingStatusTrigger] = screen.getAllByRole("combobox");
    await user.click(filingStatusTrigger);
    await user.click(screen.getByRole("option", { name: /Married Filing Jointly/i }));

    await user.click(screen.getByRole("button", { name: /Calculate Taxes/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_use", {
      action: "tax_calculator",
      income: "120k",
    });
  });

  it("does not fire analytics when required fields are missing", async () => {
    const user = userEvent.setup();
    render(<TaxCalculator />);

    await user.type(screen.getByLabelText(/Annual Gross Income/i), "50000");

    const button = screen.getByRole("button", { name: /Calculate Taxes/i });
    expect(button).toBeDisabled();
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
