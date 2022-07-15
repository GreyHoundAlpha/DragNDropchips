import React, { useState } from "react";
import "./Dnd.css";

export default function Dnd() {
  // Initial groups to drag between
  const groups = ["parent area", "group1", "group2", "group3", "noDrop"];
  // Initial items to be dragged
  const initialItems = [
    { id: 1, group: "group1", value: "drag 1", selected: false },
    { id: 2, group: "group2", value: "drag 2", selected: false },
    { id: 3, group: "group3", value: "drag 3", selected: false },
    { id: 4, group: "group3", value: "drag 4", selected: false },
    { id: 5, group: "group3", value: "drag 5", selected: false },
  ];

  const initialItems2 = [
    { id: 1, value: "drag 1", selected: false },
    { id: 2, value: "drag 2", selected: false },
    { id: 3, value: "drag 3", selected: false },
    { id: 4, value: "drag 4", selected: false },
    { id: 5, value: "drag 5", selected: false },
    {
      id: 5,
      group: "001",
      isSelected: true,
      groupExpression: [
        { id: 6, value: "drag 2", selected: false },
        { id: 7, value: "drag 3", selected: false },
        { id: 8, value: "drag 4", selected: false },
        { id: 9, value: "drag 5", selected: false },
      ],
    },
  ];

  const [items, setItems] = useState(initialItems);

  const [dragData, setDragData] = useState({});
  const [modalDragData, setModalDragData] = useState([]);

  const [noDrop, setNoDrop] = useState("");
  //Adding counter for lists
  const [listCounter, setListCounter] = useState(items.length);
  const [groupSelected, setGroupSelected] = useState("group1");
  const [checkboxValue, setCheckboxValue] = useState("");
  const [deleteSelected, setDeleteSelected] = useState("");

  //handling checkbox
  const handleCheckbox = (e, selectItem, group) => {
    const dummyItems = items;
    const dummyWithoutSelected = dummyItems.filter(
      (item) => item.id !== selectItem.id
    );
    // console.log(dummyWithoutSelected);
    if (e.target.checked === true) {
      selectItem.selected = true;
      // setItems([...dummyWithoutSelected, selectItem]);
    } else {
      selectItem.selected = false;
    }
  };
  const selectedArray = items.filter((item) => item.selected === true);

  const handleDragStart = (e, id, group) => {
    setDragData({ id: id, initialGroup: group });
  };
  console.log(dragData);
  // const handleModalDragStart = (e) => {
  //   console.log(selectedArray);
  //   setModalDragData([...selectedArray]);
  // };
  // console.log(modalDragData);
  const addItems = (e) => {
    e.preventDefault();
    setListCounter((prevState) => prevState + 1);
    setItems((prevState) => [
      ...prevState,
      {
        id: listCounter + 1,
        group: groupSelected,
        value: `drag ${listCounter + 1}`,
      },
    ]);
  };
  const deleteItems = (e) => {
    e.preventDefault();
    const dummyItems = items;
    const deleteIndex = dummyItems.findIndex(
      (item) =>
        item.group === deleteSelected.group &&
        item.value === deleteSelected.value
    );
    // console.log(deleteIndex);
    dummyItems.splice(deleteIndex, 1);
    // console.log("dummyItems", dummyItems);
    setItems([...dummyItems]);
  };

  const handleDragEnter = (e, group) => {
    if (group === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    setNoDrop("");
  };

  const changeCategory = (itemId, group) => {
    const newItems = [...items];
    newItems[itemId - 1].group = group;
    setItems([...newItems]);
  };
  // const changeModalContentCategory = (group) => {
  //   const dataTransfer = selectedArray.forEach((item) => (item.group = group));
  //   console.log("dataTransfer", dataTransfer);
  // };

  const handleDrop = (e, group) => {
    setNoDrop("");
    const selected = dragData.id;
    if (group === "noDrop") {
      console.log("nuh uh");
    } else {
      console.log(selected);
      changeCategory(selected, group);
      // changeModalContentCategory(group);
    }
  };

  const selectGroupToAdd = (e, group) => {
    // console.log("groupSelected", group);
    setGroupSelected(group);
  };
  const selectItemToDelete = (e, item) => {
    // console.log("itemSelected", item);
    setDeleteSelected({ ...item });
  };
  //drop Group
  // const handleGroupDragStart = (e) => {
  //   console.log(e);
  // };
  return (
    <>
      <button onClick={addItems}>Add list Items</button>
      <button onClick={deleteItems}>Delete list Items</button>
      <div className="dropGroupCont">
        <div className="dropGroup">drop Group</div>
      </div>
      {/* <button onClick={deleteItems}>Delete Selected Item</button> */}
      <div className="groups">
        {groups.map((group) => (
          <div
            className={`${
              group === "noDrop" ||
              noDrop === "noDrop" ||
              group === "parent area"
                ? noDrop
                : "group"
            }`}
            // event handlers
            onDragEnter={(e) => handleDragEnter(e, group)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, group)}
            key={group}
            // onDragStart={handleGroupDragStart}
            onClick={(e) => selectGroupToAdd(e, group)}
          >
            <h1 className="title">{group}</h1>
            {/* {selectedArray.length > 0 && group === selectedArray[0].group && (
              <div className="selectedItemsModal" draggable="true">
                {selectedArray.length} selected
              </div> */}
            {/* )} */}
            <div>
              {items
                .filter((item) => item.group === group)
                .map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`${
                      group === "noDrop" && noDrop === "noDrop"
                        ? "notAllowed"
                        : "item"
                    }`}
                    draggable
                    // event handler
                    onDragStart={(e) => handleDragStart(e, item.id, group)}
                    onClick={(e) => selectItemToDelete(e, item)}
                  >
                    <input
                      type="checkbox"
                      value={checkboxValue}
                      onChange={(e) => handleCheckbox(e, item, group)}
                    />{" "}
                    {item.value}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
