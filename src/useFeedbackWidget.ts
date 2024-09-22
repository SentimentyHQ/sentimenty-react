// useFeedbackWidget.ts
import { useEffect } from "react";

export const useFeedbackWidget = () => {
  useEffect(() => {
    if ((window as any).__feedback_widget_injected__) return;
    (window as any).__feedback_widget_injected__ = true;

    const script = document.createElement("script");
    script.src = "https://sentimenty.co/feedback-widget.js";
    script.defer = true;

    const onScriptError = () => script.remove();
    script.addEventListener("error", onScriptError);

    document.body.appendChild(script);
  }, []);
};
