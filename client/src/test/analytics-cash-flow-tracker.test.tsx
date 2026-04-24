import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CashFlowTracker from "@/components/calculators/cash-flow-tracker";

describe("Cash Flow Tracker analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("fires action event with cash_flow_add_item when an income item is added", async () => {
    const user = userEvent.setup();
    render(<CashFlowTracker />);

    await user.type(screen.getByLabelText(/Item Name/i), "Monthly Revenue");
    await user.type(screen.getByLabelText(/Amount/i), "5000");

    await user.click(screen.getByRole("button", { name: /Add Item/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "action", {
      action: "cash_flow_add_item",
      type: "income",
    });
  });

  it("fires action event with cash_flow_add_item and expense type when expense is added", async () => {
    const user = userEvent.setup();
    render(<CashFlowTracker />);

    await user.type(screen.getByLabelText(/Item Name/i), "Office Rent");
    await user.type(screen.getByLabelText(/Amount/i), "2000");
    await user.click(screen.getByRole("button", { name: /Expense/i }));

    await user.click(screen.getByRole("button", { name: /Add Item/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "action", {
      action: "cash_flow_add_item",
      type: "expense",
    });
  });

  it("fires action event with cash_flow_remove_item when an item is removed", async () => {
    const user = userEvent.setup();
    render(<CashFlowTracker />);

    await user.type(screen.getByLabelText(/Item Name/i), "Monthly Revenue");
    await user.type(screen.getByLabelText(/Amount/i), "5000");
    await user.click(screen.getByRole("button", { name: /Add Item/i }));

    vi.clearAllMocks();

    await user.click(screen.getByRole("button", { name: /Remove Monthly Revenue/i }));

    expect(window.gtag).toHaveBeenCalledWith("event", "action", {
      action: "cash_flow_remove_item",
    });
  });

  it("does not fire analytics when Add Item is clicked with no name", async () => {
    const user = userEvent.setup();
    render(<CashFlowTracker />);

    await user.type(screen.getByLabelText(/Amount/i), "5000");

    const button = screen.getByRole("button", { name: /Add Item/i });
    expect(button).toBeDisabled();
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
