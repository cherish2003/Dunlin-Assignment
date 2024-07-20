import React from "react";

const POSTagging = React.memo(({ tokens, highlightType }: any) => {
  const getColorClass = (tag: string) => {
    switch (tag) {
      case "NOUN":
        return "text-blue-600";
      case "VERB":
        return "text-red-600";
      case "ADJ":
        return "text-green-600";
      case "ADV":
        return "text-purple-600";
      case "PRON":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <p className="text-base">
      {tokens.map((token: any, index: number) => (
        <span
          key={index}
          className={
            token.partOfSpeech.tag === highlightType
              ? getColorClass(token.partOfSpeech.tag)
              : ""
          }
        >
          {token.text.content}{" "}
        </span>
      ))}
    </p>
  );
});

export default POSTagging;
