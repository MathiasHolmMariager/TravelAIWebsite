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
    const storedArray =
      JSON.parse(localStorage.getItem("savedItemsKey")!) || [];
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

        //tilføjer arrive og depart tider i skema
        const arrivetime = localStorage.getItem("TRAVEL_DATE_TIME_ARRIVE");
        const arriveloca = localStorage.getItem("TRAVEL_TO");
        const arriveItem = `Arriving time at ${arriveloca} is ${arrivetime}`;

        const departtime = localStorage.getItem("RETURN_DATE_TIME_ARRIVE");
        const departloca = localStorage.getItem("RETURN_FROM");
        const departItem = `Departing time at ${departloca} is ${departtime}`;

        if (arriveItem && departItem) {
          const updatedDroppedItems = { ...droppedItems };
          const lastDay = `Day ${daysBetween}`;
          updatedDroppedItems[`Day 1`] = updatedDroppedItems[`Day 1`] || [];
          updatedDroppedItems[`Day 1`].push(arriveItem);
          updatedDroppedItems[lastDay] = updatedDroppedItems[lastDay] || [];
          updatedDroppedItems[lastDay].push(departItem);
          setDroppedItems(updatedDroppedItems);
        }
      }
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
    const isLastItemInFirstDroplist =
      category === `Day ${numLists}` && index === 0;

    return (
      <div ref={isDroppedItem ? undefined : drag} className="list-item-box">
        <span className="list-item-text">{item}</span>
        {isDroppedItem &&
          !isFirstItemInFirstDroplist &&
          !isLastItemInFirstDroplist && (
            <button
              className="remove-button"
              onClick={() => onRemove(index, category)}
              
            >
              Remove
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
    const dayOfWeek = travelDate.format("dddd");

    return (
      <div key={category} ref={drop} className="scrollable-droplist">
        <h3>{`${category}`}</h3>
        <h3>{`${dayOfWeek} (${travelDate.format("DD-MM-YYYY")})`}</h3>
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

  const [city] = useState(() => {
    const data = window.localStorage.getItem("city");
    return data !== null ? data : "";
  });

  const [local_flight_price] = useState(() => {
    const data = window.localStorage.getItem("FLIGHT_PRICE");
    return data !== null ? data : "";
  });

  const [local_hotel_price] = useState(() => {
    const data = window.localStorage.getItem("HOTEL_PRICE");
    return data !== null ? data : "";
  });

  const flight_price = parseFloat(local_flight_price);
  const hotel_price = parseFloat(local_hotel_price);
  const total_price = flight_price + hotel_price;

  const [travelfrom] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_FROM");
    return data !== null ? data : "";
  });

  const [travelto] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_TO");
    return data !== null ? data : "";
  });

  const [traveldate] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE");
    return data !== null ? data : "";
  });

  const [traveltimedepart] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE_TIME_DEPART");
    return data !== null ? data : "";
  });

  const [traveltimearrive] = useState(() => {
    const data = window.localStorage.getItem("TRAVEL_DATE_TIME_ARRIVE");
    return data !== null ? data : "";
  });

  const [returnfrom] = useState(() => {
    const data = window.localStorage.getItem("RETURN_FROM");
    return data !== null ? data : "";
  });

  const [returnto] = useState(() => {
    const data = window.localStorage.getItem("RETURN_TO");
    return data !== null ? data : "";
  });

  const [returndate] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE");
    return data !== null ? data : "";
  });

  const [returntimedepart] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE_TIME_DEPART");
    return data !== null ? data : "";
  });

  const [returntimearrive] = useState(() => {
    const data = window.localStorage.getItem("RETURN_DATE_TIME_ARRIVE");
    return data !== null ? data : "";
  });

  const [accommodation] = useState(() => {
    const data = window.localStorage.getItem("AccommodationType");
    return data !== null ? data : "";
  });

  const [accommodationName] = useState(() => {
    const data = window.localStorage.getItem("AccommodationName");
    return data !== null ? data : "";
  });

  const [adults] = useState(() => {
    const data = window.localStorage.getItem("adults");
    return data !== null ? data : "";
  });

  const [kids] = useState(() => {
    const data = window.localStorage.getItem("kids");
    return data !== null ? data : "";
  });

  const [interests] = useState(() => {
    const data = window.localStorage.getItem("generatedInterests");
    return data !== null ? data : "";
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="OverviewPage">
        <div className="scrollable-box">
          <p><b>Drag experinces to your shedule</b></p>
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
        <div className="trip-overview">
          <p>
            <b>Your Trip Overview:</b>
          </p>
          <p>
            <b>City:</b> {city}
          </p>
          <p>
            <b>Total Price:</b> {total_price} EUR
          </p>
          <p>
            <b>Departure:</b> <br />
            {travelfrom} ⟶ {travelto}
            <br />
            {traveldate} 🕑 {traveltimedepart} - {traveltimearrive}
          </p>
          <p>
            <b>Return:</b> <br />
            {returnfrom} ⟶ {returnto}
            <br />
            {returndate} 🕑 {returntimedepart} - {returntimearrive}
          </p>
          <p>
            <b>Accommodation:</b>
            <br />
            {accommodationName}
            {" ("}
            {accommodation}
            {")"}
          </p>
          <p>
            <b>Adults:</b> {adults}
          </p>
          <p>
            <b>Kids:</b> {kids}
          </p>
          <p>
            <b>Interests:</b> {interests}
          </p>
        </div>
      </div>
    </DndProvider>
  );
};

export default Overview;
