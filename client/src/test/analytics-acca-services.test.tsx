import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ACCAServices from "@/components/acca-services";

describe("ACCAServices analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    vi.clearAllMocks();
  });

  it("fires acca_service_click with correct service_name for first service", async () => {
    const user = userEvent.setup();
    render(<ACCAServices />);

    const learnMoreButtons = screen.getAllByRole("button", { name: /Learn More/i });
    await user.click(learnMoreButtons[0]);

    expect(window.gtag).toHaveBeenCalledWith("event", "acca_service_click", {
      section: "acca_services",
      service_name: "international_financial_reporting",
    });
  });

  it("fires acca_service_click with correct service_name for second service", async () => {
    const user = userEvent.setup();
    render(<ACCAServices />);

    const learnMoreButtons = screen.getAllByRole("button", { name: /Learn More/i });
    await user.click(learnMoreButtons[1]);

    expect(window.gtag).toHaveBeenCalledWith("event", "acca_service_click", {
      section: "acca_services",
      service_name: "corporate_finance_&_advisory",
    });
  });

  it("fires acca_service_click with correct service_name for third service", async () => {
    const user = userEvent.setup();
    render(<ACCAServices />);

    const learnMoreButtons = screen.getAllByRole("button", { name: /Learn More/i });
    await user.click(learnMoreButtons[2]);

    expect(window.gtag).toHaveBeenCalledWith("event", "acca_service_click", {
      section: "acca_services",
      service_name: "international_tax_planning",
    });
  });

  it("fires acca_service_click with correct service_name for fourth service", async () => {
    const user = userEvent.setup();
    render(<ACCAServices />);

    const learnMoreButtons = screen.getAllByRole("button", { name: /Learn More/i });
    await user.click(learnMoreButtons[3]);

    expect(window.gtag).toHaveBeenCalledWith("event", "acca_service_click", {
      section: "acca_services",
      service_name: "multi-national_business_setup",
    });
  });

  it("fires acca_consultation_click when International Consultation button is clicked", async () => {
    const user = userEvent.setup();
    render(<ACCAServices />);

    const consultationButton = screen.getByRole("button", { name: /International Consultation/i });
    await user.click(consultationButton);

    expect(window.gtag).toHaveBeenCalledWith("event", "acca_consultation_click", {
      section: "acca_services",
    });
  });

  it("renders four Learn More buttons, one per service", () => {
    render(<ACCAServices />);
    const buttons = screen.getAllByRole("button", { name: /Learn More/i });
    expect(buttons).toHaveLength(4);
  });

  it("does not fire analytics on initial render", () => {
    render(<ACCAServices />);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
