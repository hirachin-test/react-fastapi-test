// import React from "react";
import Message from "./Message";
import React, { useState, useEffect } from "react";

const content = {
  "background_image": "./host.png",
  "id": 1,
  "choices": [
    {
      "choice_text": "持ってこれるだけ持ってこいよ！",
      "scene_id": 1,
      "id": 1,
      "text_sets_id":[2]
    },
    {
      "choice_text": "いやぁ、無理しない範囲で大丈夫だよ",
      "scene_id": 1,
      "id": 2,
      "text_sets_id":[2,3]
    }
  ],
  "text_sets": [
    {
      "id": 1,
      "scene_id": 1,
      "texts": [
        {
          "text": "ひらちん:「お、今日夕方から同伴予定の女の子Aからの連絡だ。」！",
          "gender": "male",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 1
        },
        {
          "text": "女性A:「今日Takuyaに会えるの楽しみー！どれくらいお金を持っていけばいいかな？」！",
          "gender": "female",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 2
        },
        {
          "text": "ひらちん: いやぁ、無理しない範囲で大丈夫だよ",
          "gender": "male",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 3
        },
        {
          "text": "女性A:「優しいね。ありがとう。」（本当は貢いでほしいと思っているのに、優しいなぁ）",
          "gender": "female",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 4
        },
        {
          "text": "女性A:お金が50万減った...女の子の満足度が10上がった...メンタルが5下がった",
          "gender": "male",
          "emotion": "negative",
          "text_set_id": 1,
          "id": 5
        }
      ]
      
    },
    {
      "id": 2,
      "scene_id": 1,
      "texts": [
        {
          "text": "ひらちん:「お、今日夕方から同伴予定の女の子Aからの連絡だ。」！",
          "gender": "male",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 1
        },
        {
          "text": "女性A:「今日Takuyaに会えるの楽しみー！どれくらいお金を持っていけばいいかな？」！",
          "gender": "female",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 2
        }
      ]
      
    },
    {
      "id": 3,
      "scene_id": 1,
      "texts": [
        {
          "text": "ひらちん:「お、今日夕方から同伴予定の女の子Aからの連絡だ。」！",
          "gender": "male",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 1
        },
        {
          "text": "女性A:「今日Takuyaに会えるの楽しみー！どれくらいお金を持っていけばいいかな？」！",
          "gender": "female",
          "emotion": "neutral",
          "text_set_id": 1,
          "id": 2
        }
      ]
      
    }
  ],

};


// const Messages = () => {
//   return (
//     <div className="chat_messages_container">
//       {content.text_sets[0].texts.map((item, index) => 
//         <Message key={item.id} content={item.text}/>
//       )}
//     </div>
//   );
// };

const Messages = () => {
  const [message, setMessage] = useState(null);
  const [choices, setChoices] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDisplayingChoices, setIsDisplayingChoices] = useState(false);
  const [currentTextSetIndex, setCurrentTextSetIndex] = useState(0);
  const [hasDisplayedChoices, setHasDisplayedChoices] = useState(false);

  const handleChoiceClick = (textSetIds) => {
    const randomTextSetId = textSetIds[Math.floor(Math.random() * textSetIds.length)];
    const newTextSetIndex = content.text_sets.findIndex(text_set => text_set.id === randomTextSetId);
    setCurrentTextSetIndex(newTextSetIndex);
    setCurrentMessageIndex(0);
    setIsDisplayingChoices(false);
  };

  useEffect(() => {
    if (currentMessageIndex < content.text_sets[currentTextSetIndex].texts.length) {
      const timer = setTimeout(() => {
        setMessage(content.text_sets[currentTextSetIndex].texts[currentMessageIndex]);
        setCurrentMessageIndex(currentMessageIndex => currentMessageIndex + 1);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    } else if (!isDisplayingChoices && !hasDisplayedChoices) {
      setMessage(null);
      setChoices(content.choices);
      setIsDisplayingChoices(true);
      setHasDisplayedChoices(true);
    }
  }, [currentMessageIndex, isDisplayingChoices, hasDisplayedChoices, currentTextSetIndex]);

  return (
    <div className="chat_messages_container">
      {message && <Message key={message.id} content={message.text}/>}
      {isDisplayingChoices && choices.map((choice, index) =>
        <button key={index} onClick={() => handleChoiceClick(choice.text_sets_id)}>{choice.choice_text}</button>
      )}
    </div>
  );
};

export default Messages;