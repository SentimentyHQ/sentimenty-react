// FeedbackWidget.tsx
import React, { FunctionComponent, ReactElement } from "react";
import { useFeedbackWidget } from "./useFeedbackWidget";

type Props = {
  clientId: string;
  visitorId?: string;
  options?: {
    [key: string]: string;
  };
  metadata?: {
    [key: string]: string;
  };
  children?: ReactElement | ((props: object) => ReactElement);
};

export const FeedbackWidget: FunctionComponent<Props> = (props) => {
  useFeedbackWidget();

  if (!props.children) return null;

  const mapToDataAttributes = (
    obj?: { [key: string]: string },
    prefix = ""
  ) => {
    return Object.entries(obj || {}).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [`data-feedback-${prefix}${key}`]: value,
      };
    }, {});
  };

  const childrenProps = {
    "data-feedback-client-id": props.clientId,
    ...mapToDataAttributes(props.options),
    ...mapToDataAttributes(props.metadata),
    "data-feedback-visitor-id": props.visitorId,
  };

  if (React.isValidElement(props.children)) {
    return React.cloneElement(props.children, childrenProps);
  }

  if (typeof props.children === "function") {
    return props.children(childrenProps);
  }

  return null;
};
