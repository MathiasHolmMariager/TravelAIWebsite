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
  const numberOfAdults = localStorage.getItem("adults") || 0;
  const numberOfKids = localStorage.getItem("kids") || 0;

  const generateListNames = () => {
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

  const listNames = generateListNames();

  const [checked, setChecked] = React.useState<{ [key: string]: string[] }>({});

  const listColors = [
    "#ffd0d1", "#ffcccb", "#ffb4b5", "#ff9a9b", "#ff8081",
    "#c4f2c5", "#c2f0c2", "#a8e7a9", "#8edf8f", "#74d677",
    "#b5e6ff", "#a3ccf9", "#90b3f3", "#7d9bf1", "#6b83eb",
    "#f1e89f", "#f0e68c", "#eedf6f", "#ebd63f", "#e8cc0f",
  ];

  const handleToggle = (listName: string, itemName: string) => () => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };

      if (!newChecked[listName]) {
        newChecked[listName] = [itemName];
      } else {
        if (newChecked[listName].includes(itemName)) {
          newChecked[listName] = newChecked[listName].filter(
            (name) => name !== itemName
          );
        } else {
          newChecked[listName].push(itemName);
        }
      }

      return newChecked;
    });
  };

  return (
    <div>
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
      <div className="personal-attributes-container">
        <strong>Personal attributes:</strong>
        <ul className="personal-attributes-list">
          {listNames.map((listName, listIndex) => {
            const sortedItems = (checked[listName] || []).sort();

            return (
              <li
                key={listIndex}
                className="personal-attributes-item"
              >
                {listName}: {sortedItems.join(", ")}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}