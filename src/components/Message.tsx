import React from "react";

interface IMessageProps {
  type?: "error" | "default" | "info";
  message?: string;
  messages?: string[];
}

const Message = ({
  message,
  messages = [],
  type = "default",
}: IMessageProps) => {
  return (
    <div>
      <div>{message ? message : null}</div>
      {messages.length ? messages.map((msg) => <div>{msg}</div>) : null}
    </div>
  );
};

export default Message;
