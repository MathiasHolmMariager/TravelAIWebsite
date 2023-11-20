import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const customNames = ['Food', 'Sports', 'History', 'Art', 'Nature', 'Culture'];
const listNames = ['Mathias', 'Nikolaj', 'Thormod', 'Maria'];

export default function CheckboxList() {
  const [checked, setChecked] = React.useState<{ [key: string]: string[] }>({});

  const listColors = ['#ffcccb', '#c2f0c2', '#b3e0ff', '#f0e68c'];

  const handleToggle = (listName: string, itemName: string) => () => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };

      if (!newChecked[listName]) {
        newChecked[listName] = [itemName];
      } else {
        if (newChecked[listName].includes(itemName)) {
          newChecked[listName] = newChecked[listName].filter((name) => name !== itemName);
        } else {
          newChecked[listName].push(itemName);
        }
      }

      return newChecked;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {listNames.map((listName, listIndex) => (
          <List
            key={listIndex}
            sx={{
              margin: 5,
              border: '1px solid #ccc',
              borderRadius: '5px',
              bgcolor: listColors[listIndex],
            }}
          >
            <ListItemText primary={<span style={{ textDecoration: 'underline' ,fontWeight: 'bold' }}>{listName}</span>} />
            {customNames.map((itemName, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(listName, itemName)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked[listName]?.includes(itemName) ?? false}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
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
      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginTop: '10px', backgroundColor: '#D3D3D3' }}>
        <strong>Personal attributes:</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #ccc' }}>
          {listNames.map((listName, listIndex) => (
            <li key={listIndex} style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>
              {listName}: {checked[listName]?.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}