import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Overview.css";
import dayjs from "dayjs";

const ItemTypes = {
  LIST_ITEM: "list-item",
};

const Overview: React.FC = () => {
  const [myArray, setMyArray] = useState<string[]>([]);
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [numLists, setNumLists] = useState<number>(10);

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("itemsArray")!) || [];
    setMyArray(storedArray);

    const travelDateStr = localStorage.getItem("TRAVEL_DATE");
    const returnDateStr = localStorage.getItem("RETURN_DATE");

    if (travelDateStr && returnDateStr) {
      const travelDate = new Date(travelDateStr.split(".").reverse().join("-"));
      const returnDate = new Date(returnDateStr.split(".").reverse().join("-"));

      if (!isNaN(travelDate.getTime()) && !isNaN(returnDate.getTime())) {
        const daysBetween =
          Math.ceil(
            (returnDate.getTime() - travelDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1;
        setNumLists(daysBetween);
      }
    }

    const arrivetime = localStorage.getItem("TRAVEL_DATE_TIME_ARRIVE");
    const arriveloca = localStorage.getItem("TRAVEL_TO");
    const additionalItem = `Arriving time at ${arriveloca} is ${arrivetime}`;
    if (additionalItem) {
      const updatedDroppedItems = { ...droppedItems };
      updatedDroppedItems[`Day 1`] = updatedDroppedItems[`Day 1`] || [];
      updatedDroppedItems[`Day 1`].push(additionalItem);
      setDroppedItems(updatedDroppedItems);
      setMyArray((prevMyArray) =>
        prevMyArray.filter((item) => item !== additionalItem)
      );
    }
  }, []);

  const DraggableListItem = ({
    item,
    index,
    isDroppedItem,
    onRemove,
    category,
  }: {
    item: string;
    index: number;
    isDroppedItem: boolean;
    onRemove: (index: number, category: string) => void;
    category: string;
  }) => {
    const [, drag] = useDrag({
      type: ItemTypes.LIST_ITEM,
      item: { index },
      canDrag: !isDroppedItem,
    });
  
    const isFirstItemInFirstDroplist = category === "Day 1" && index === 0;
  
    return (
      <div ref={isDroppedItem ? undefined : drag} className="list-item-box">
        <span className="list-item-text">{item}</span>
        {isDroppedItem && !isFirstItemInFirstDroplist && (
          <button
            className="remove-button"
            onClick={() => onRemove(index, category)}
          >
            X
          </button>
        )}
      </div>
    );
  };

  const handleDrop = (droppedItem: { index: number }, category: string) => {
    const { index } = droppedItem;

    if (index >= 0 && index < myArray.length) {
      const updatedMyArray = [...myArray];
      const item = updatedMyArray[index];

      const updatedDroppedItems = { ...droppedItems };
      updatedDroppedItems[category] = updatedDroppedItems[category] || [];
      updatedDroppedItems[category].push(item);
      setDroppedItems(updatedDroppedItems);

      updatedMyArray.splice(index, 1);
      setMyArray(updatedMyArray);
    }
  };

  const DropList = ({ index }: { index: number }) => {
    const category = `Day ${index + 1}`;
    const [, drop] = useDrop({
      accept: ItemTypes.LIST_ITEM,
      drop: (item: { index: number }) => handleDrop(item, category),
    });

    const handleRemove = (index: number, category: string) => {
      const updatedDroppedItems = { ...droppedItems };
      const removedItem = updatedDroppedItems[category].splice(index, 1)[0];

      setDroppedItems(updatedDroppedItems);
      setMyArray((prevMyArray) => [...prevMyArray, removedItem]);
    };

    const travelDateStr = localStorage.getItem("TRAVEL_DATE");
    const travelDate = dayjs(travelDateStr, "DD-MM-YYYY").add(index, "day");

    return (
      <div key={category} ref={drop} className="scrollable-droplist">
        <h3>{category}</h3>
        <h3>{travelDate.format("DD-MM-YYYY")}</h3>
        <ul>
          {droppedItems[category]?.map((item, index) => (
            <DraggableListItem
              key={index}
              item={item}
              index={index}
              isDroppedItem={true}
              onRemove={(index) => handleRemove(index, category)}
              category={category}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="OverviewPage">
        <div className="scrollable-box">
          <ul>
            {myArray.map((item, index) => (
              <DraggableListItem
                key={index}
                item={item}
                index={index}
                isDroppedItem={false}
                onRemove={(_index) => {}}
                category={""}
              />
            ))}
          </ul>
        </div>

        <div className="scrollable-drop-lists">
          <div className="drop-lists-container">
            {[...Array(numLists)].map((_, index) => (
              <DropList key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Overview;
