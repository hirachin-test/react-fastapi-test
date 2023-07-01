import React, { useState, useRef, useEffect } from "react";
import { GrUser } from "react-icons/gr";
import { FcMindMap } from "react-icons/fc";

const SlowText = (props) => {
  const { speed, text } = props;

  const [placeholder, setPlaceholder] = useState(text[0]);

  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      let addChar = setInterval(tick, speed);
      return () => clearInterval(addChar);
    }
  }, [placeholder, speed, text]);

  return <span>{placeholder}</span>;
};

const Message = ({ content }) => {
  return (
    <div
      className="message_container"
      style={{ background:"rgb(247, 247, 248)" }}
    >
      <div className="message_avatar_container">
        <FcMindMap />
      </div>
      <p className="message_text">
        <SlowText speed={20} text={content} /> 
      </p>
    </div>
  );
};

export default Message;
