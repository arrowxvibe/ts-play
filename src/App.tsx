import React, { useEffect, useState } from "react";
import { useTableState } from "./store/useTableState";
import { RowValidity, useValidityState } from "./store/useValidityState";

// Define the Item type
type Item = {
  rowId: number;
  quantity: number;
  itemName: string;
  warehouseId: string;
  validity: boolean;
};

function App() {
  const { data, setData } = useTableState("warehouse-items");
  const { validity, setValidity } = useValidityState(); 

  useEffect(() => {
    if (localStorage.getItem("loaded") !== "true") {
      localStorage.setItem("loaded", "true");
      const items: Item[] = [
        {
          rowId: 1,
          quantity: 10,
          itemName: "Widget",
          warehouseId: "A123",
          validity: true,
        },
        {
          rowId: 2,
          quantity: 5,
          itemName: "Gadget",
          warehouseId: "B456",
          validity: false,
        },
      ];
      setData(items);
    }
  }, []);

  useEffect(() => {
    const validityItems: RowValidity[] = [
      { rowId: 1, validity: true },
      { rowId: 2, validity: true },
    ];
    setValidity(validityItems);
  }, [])

  const handleClick = () => {
    const newItem: Item = {
      rowId: 3,
      quantity: 20,
      itemName: "Updated Item",
      warehouseId: "C789",
      validity: true,
    };
    setData(data.concat(newItem));
    const validityNewItems : RowValidity[] = [
      {
        rowId: 3, validity: true
      }
    ]
    setValidity(validity.concat(validityNewItems))
  };

  const handleClear = () => {
    localStorage.setItem("loaded", "false");
  };

  return (
    <div style={{ margin: 30 }}>
      <div>
        <button onClick={handleClick}>Click me</button>
        <button onClick={handleClear}>Clear Local Storage</button>
      </div>
      <div>Table Data - cached</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>Validity Data - no cache</div>
      <pre>{JSON.stringify(validity, null, 2)}</pre>
    </div>
  );
}

export default App;
