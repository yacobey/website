import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AIToolsSection from "@/components/ai-tools-section";

describe("AIToolsSection analytics", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    window.gtag = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    act(() => { vi.runAllTimers(); });
    vi.useRealTimers();
  });

  it("does not fire analytics on initial render", () => {
    render(<AIToolsSection />);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("fires click event with try_ai_builder action when Try AI Builder is clicked", () => {
    render(<AIToolsSection />);

    const tryButton = screen.getByRole("button", { name: /Try AI Builder/i });
    fireEvent.click(tryButton);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "try_ai_builder",
      section: "ai_tools",
    });
  });

  it("fires click event with generate_calculator action when Generate Calculator is clicked", () => {
    render(<AIToolsSection />);

    const textarea = screen.getByPlaceholderText(/I need a loan payment calculator/i);
    fireEvent.change(textarea, { target: { value: "I need a tax calculator" } });

    const generateButton = screen.getByRole("button", { name: /Generate Calculator/i });
    fireEvent.click(generateButton);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "generate_calculator",
      section: "ai_tools",
    });

    act(() => { vi.runAllTimers(); });
  });

  it("does not fire generate_calculator event when prompt is empty", () => {
    render(<AIToolsSection />);

    const generateButton = screen.getByRole("button", { name: /Generate Calculator/i });
    expect(generateButton).toBeDisabled();
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("fires click event with use_tax_calculator action when Tax Calculator is clicked", () => {
    render(<AIToolsSection />);

    const useButtons = screen.getAllByRole("button", { name: /Use Calculator/i });
    fireEvent.click(useButtons[0]);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "use_tax_calculator",
      section: "ai_tools",
    });
  });

  it("fires click event with use_roi_calculator action when ROI Calculator is clicked", () => {
    render(<AIToolsSection />);

    const useButtons = screen.getAllByRole("button", { name: /Use Calculator/i });
    fireEvent.click(useButtons[1]);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "use_roi_calculator",
      section: "ai_tools",
    });
  });

  it("fires click event with use_cash_flow_calculator action when Cash Flow Tracker is clicked", () => {
    render(<AIToolsSection />);

    const useButtons = screen.getAllByRole("button", { name: /Use Calculator/i });
    fireEvent.click(useButtons[2]);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "use_cash_flow_calculator",
      section: "ai_tools",
    });
  });

  it("renders three Use Calculator buttons, one per pre-built calculator", () => {
    render(<AIToolsSection />);
    const useButtons = screen.getAllByRole("button", { name: /Use Calculator/i });
    expect(useButtons).toHaveLength(3);
  });
});
