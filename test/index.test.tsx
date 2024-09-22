// test/index.test.tsx
import { render, screen } from "@testing-library/react";
import * as React from "react";

import { FeedbackWidget } from "../src/FeedbackWidget";

const defaultChild = <button>Send feedback</button>;

const renderFeedbackWidget = (propsOverwrite = {}) => {
  const props = {
    children: defaultChild,
    clientId: "test-client-id",
    ...propsOverwrite,
  };

  return render(<FeedbackWidget {...props} />);
};

const getButton = () => screen.getByRole("button", { name: /send feedback/i });

it("injects the feedback widget script tag", () => {
  const { baseElement } = renderFeedbackWidget({ clientId: "test-client-id" });

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <button
          data-feedback-client-id="test-client-id"
        >
          Send feedback
        </button>
      </div>
      <script
        defer=""
        src="https://sentimenty.co/feedback-widget.js"
      />
    </body>
  `);
});

it("handles a single element as a child", () => {
  renderFeedbackWidget({ children: <button>Send feedback</button> });

  const button = screen.getByRole("button", { name: /send feedback/i });
  expect(button).toHaveAttribute("data-feedback-client-id", "test-client-id");
});

it("handles a function as a child", () => {
  renderFeedbackWidget({
    children: (props) => <button {...props}>Send feedback</button>,
  });

  const button = screen.getByRole("button", { name: /send feedback/i });
  expect(button).toHaveAttribute("data-feedback-client-id", "test-client-id");
});

it("handles visitorId", () => {
  renderFeedbackWidget({ visitorId: "my-visitor-id" });

  const button = getButton();
  expect(button).toHaveAttribute("data-feedback-client-id", "test-client-id");
  expect(button).toHaveAttribute("data-feedback-visitor-id", "my-visitor-id");
});

it("handles options", () => {
  renderFeedbackWidget({ options: { width: "500px", height: "600px" } });

  const button = getButton();
  expect(button).toHaveAttribute("data-feedback-client-id", "test-client-id");
  expect(button).toHaveAttribute("data-feedback-width", "500px");
  expect(button).toHaveAttribute("data-feedback-height", "600px");
});

it("handles metadata", () => {
  renderFeedbackWidget({
    metadata: { email: "test@example.com", website: "example.com" },
  });

  const button = getButton();
  expect(button).toHaveAttribute("data-feedback-client-id", "test-client-id");
  expect(button).toHaveAttribute("data-feedback-email", "test@example.com");
  expect(button).toHaveAttribute("data-feedback-website", "example.com");
});
