import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import "./Persons.css";

const customNames = ["Art", "Culture", "Food", "History", "Nature", "Sport"];

export default function CheckboxList() {
  const [checked, setChecked] = React.useState<{ [key: string]: string[] }>({});
  const [listNames, setListNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const numberOfAdults = localStorage.getItem("adults") || "0";
    const numberOfKids = localStorage.getItem("kids") || "0";

    const generateListNames = (): string[] => {
      const adultsArray = Array.from(
        { length: Number(numberOfAdults) },
        (_, index) => `Adult ${index + 1}`
      );
      const kidsArray = Array.from(
        { length: Number(numberOfKids) },
        (_, index) => `Kid ${index + 1}`
      );
      return [...adultsArray, ...kidsArray];
    };

    const names = generateListNames();
    setListNames(names);

    const storedChecked: { [key: string]: string[] } = {};
    names.forEach((listName) => {
      const stored = localStorage.getItem(listName);
      if (stored) {
        storedChecked[listName] = JSON.parse(stored);
      }
    });

    setChecked((prevChecked) => {
      if (JSON.stringify(prevChecked) !== JSON.stringify(storedChecked)) {
        return storedChecked;
      }
      return prevChecked;
    });
  }, []);

  const listColors = [
    "rgba(255, 84, 0, 0.5)",
    "rgba(255, 142, 0, 0.5)",
    "rgba(255, 210, 0, 0.5)",
    "rgba(129, 230, 80, 0.5)",
    "rgba(0, 210, 103, 0.5)",
    "rgba(0, 192, 255, 0.5)",
    "rgba(139, 72, 254, 0.5)",
    "rgba(202, 65, 252, 0.5)",
    "rgba(255, 70, 251, 0.5)"
  ];  

  const handleToggle = (listName: string, itemName: string) => () => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };

      if (!newChecked[listName]) {
        newChecked[listName] = [itemName];
      } else {
        const currentIndex = newChecked[listName].indexOf(itemName);
        const newCheckedItems = [...newChecked[listName]];

        if (currentIndex === -1) {
          newCheckedItems.push(itemName);
        } else {
          newCheckedItems.splice(currentIndex, 1);
        }

        newChecked[listName] = newCheckedItems;
      }

      const updatedLocalStorage = { ...newChecked };
      localStorage.setItem(listName, JSON.stringify(updatedLocalStorage[listName]));

      return newChecked;
    });
  };

  return (
    <div>
      <p className="title">What are your interests?</p>
      <div className="persons-container-wrapper">
        <div className="persons-container">
          {listNames.map((listName, listIndex) => (
            <List
              key={listIndex}
              className="person-list"
              sx={{
                bgcolor: listColors[listIndex],
              }}
            >
              <ListItemText
                primary={
                  <span
                    className="person-list-header"
                  >
                    {listName}
                  </span>
                }
              />
              {customNames.map((itemName, index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                  <ListItem key={index} disablePadding className="person-list-item">
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(listName, itemName)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked[listName]?.includes(itemName) ?? false}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={itemName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ))}
        </div>
      </div>
    </div>
  );
}