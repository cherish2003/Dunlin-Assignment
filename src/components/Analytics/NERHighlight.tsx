import React from "react";

const NERHighlight = React.memo(({ entities, highlightType }: any) => {
  const getColorClass = (type: string) => {
    switch (type) {
      case "PERSON":
        return "bg-blue-200";
      case "ORGANIZATION":
        return "bg-green-200";
      case "LOCATION":
        return "bg-yellow-200";
      case "EVENT":
        return "bg-red-200";
      case "WORK_OF_ART":
        return "bg-purple-200";
      case "CONSUMER_GOOD":
        return "bg-pink-200";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <p className="text-base">
      {entities.map((entity: any, index: number) => (
        <span
          key={index}
          className={
            entity.type === highlightType ? getColorClass(entity.type) : ""
          }
        >
          {entity.name}{" "}
        </span>
      ))}
    </p>
  );
});

export default NERHighlight;
