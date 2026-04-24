import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogPreview from "@/components/blog-preview";

vi.mock("@/lib/queryClient", () => ({
  apiRequest: vi.fn(),
  queryClient: new QueryClient(),
  getQueryFn: vi.fn(),
}));

const mockPosts = [
  {
    id: 1,
    title: "Tax Tips for Small Businesses",
    slug: "tax-tips-small-businesses",
    excerpt: "Learn how to save on taxes.",
    category: "Tax",
    publishedAt: "2024-01-15T00:00:00.000Z",
    content: "Full content here.",
    published: true,
  },
  {
    id: 2,
    title: "Accounting Best Practices",
    slug: "accounting-best-practices",
    excerpt: "Keep your books in order.",
    category: "Accounting",
    publishedAt: "2024-02-10T00:00:00.000Z",
    content: "Full content here.",
    published: true,
  },
];

function renderWithQueryClient(posts: typeof mockPosts | null = mockPosts) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  if (posts !== null) {
    client.setQueryData(["/api/blog"], posts);
  }

  return render(
    <QueryClientProvider client={client}>
      <BlogPreview />
    </QueryClientProvider>
  );
}

describe("BlogPreview analytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
    vi.clearAllMocks();
  });

  it("fires click event with read_article action when article title link is clicked", async () => {
    const user = userEvent.setup();
    renderWithQueryClient();

    const titleLink = screen.getByText("Tax Tips for Small Businesses");
    await user.click(titleLink);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "read_article",
      section: "blog_preview",
      article: "tax-tips-small-businesses",
    });
  });

  it("fires click event with read_article action when 'Read More' link is clicked", async () => {
    const user = userEvent.setup();
    renderWithQueryClient();

    const readMoreLinks = screen.getAllByText(/Read More/i);
    await user.click(readMoreLinks[0]);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "read_article",
      section: "blog_preview",
      article: "tax-tips-small-businesses",
    });
  });

  it("fires click event with view_all_posts action when 'View All Posts' button is clicked", async () => {
    const user = userEvent.setup();
    renderWithQueryClient();

    const viewAllButton = screen.getByRole("button", { name: /View All Posts/i });
    await user.click(viewAllButton);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "view_all_posts",
      section: "blog_preview",
    });
  });

  it("includes the correct slug for each article when read_article is tracked", async () => {
    const user = userEvent.setup();
    renderWithQueryClient();

    const secondArticleTitle = screen.getByText("Accounting Best Practices");
    await user.click(secondArticleTitle);

    expect(window.gtag).toHaveBeenCalledWith("event", "click", {
      action: "read_article",
      section: "blog_preview",
      article: "accounting-best-practices",
    });
  });

  it("does not fire analytics on initial render", () => {
    renderWithQueryClient();
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
