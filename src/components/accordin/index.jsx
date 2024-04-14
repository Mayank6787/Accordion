//single selection
import data from "./data";
import { useState } from "react";
import "./style.css";
//Multiple selection
export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    //we are setting currentid that we clicked
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexofCurrentId = cpyMultiple.indexOf(getCurrentId);
    console.log(findIndexofCurrentId);
    if (findIndexofCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      cpyMultiple.splice(findIndexofCurrentId, 1);
    }
    setMultiple(cpyMultiple);
  }
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-selection
      </button>
      <div className="accordian">
        {
          // Condition
          data && data.length > 0 ? (
            // if true then map data
            data.map((dataItem) => (
              <div className="item">
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                  <div>
                    {enableMultiSelection
                      ? multiple.indexOf(dataItem.id) !== -1 && (
                          <div className="content">{dataItem.answer}</div>
                        )
                      : selected === dataItem.id && (
                          <div className="content">{dataItem.answer}</div>
                        )}
                    {/* {selected === dataItem.id ||
                    multiple.indexOf(dataItem.id) !== -1 ? (
                      <div className="content">{dataItem.answer}</div>
                    ) : null} */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // if not true then return this div
            <div>No data found</div>
          )
        }
      </div>
    </div>
  );
}
