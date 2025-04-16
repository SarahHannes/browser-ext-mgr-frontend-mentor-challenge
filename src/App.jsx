import { useState } from "react";
import data from "/data.json";

import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  const dataObj = {};
  data.forEach((element) => {
    dataObj[element.name] = { ...element };
  });

  // states
  const [darkMode, setDarkMode] = useState(true);
  const [dataState, setDataState] = useState(dataObj);
  const [filterExt, setFilterExt] = useState("all");

  // derived
  const dataArr = [];
  const activeArr = [];
  const inactiveArr = [];
  for (let key in dataState) {
    dataArr.push(dataState[key]);

    if (dataState[key].isActive) {
      activeArr.push(dataState[key]);
    } else {
      inactiveArr.push(dataState[key]);
    }
  }
  console.log("dataArr", dataArr);

  // static
  const darkLightVariant = {
    light: {
      mainDiv:
        "min-h-screen p-2 lg:px-20 lg:py-5  bg-linear-180 from-(--color-light1) to-(--color-light2)",
      header:
        "bg-white flex justify-between m-4 p-2 rounded-2xl inset-shadow-md border-1 border-neutral-300/30",
      headerButton:
        "bg-neutral-200/60 basis-10 cursor-pointer flex justify-center items-center rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-neutral-300",
      logoImg: "",
      filterButtonActive:
        "shadow-sm border-1 border-red-900/10 cursor-pointer rounded-full bg-red-700 px-3 py-1 lg:basis-1/5 lg:self-center text-neutral-100 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-red-400",
      filterButtonInactive:
        "shadow-sm border-1 border-neutral-200 cursor-pointer rounded-full bg-neutral-100/70 py-1 px-3 lg:basis-1/3 lg:self-center focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:opacity-55",

      card: "mt-3 lg:mt-0 py-2 px-3 bg-white rounded-xl inset-shadow-sm border-1 border-neutral-300/30 lg:h-[180px]",
      cardH2: "font-bold text-lg text-neutral-800",
      cardP: "text-neutral-600 lg:text-sm",
      cardButton:
        "cursor-pointer py-1 px-3 rounded-full border-1 border-neutral-300 focus:outline-2 focus:outline-offset-2 focus:outline-red-700  hover:bg-red-700 hover:text-neutral-100",
    },
    dark: {
      mainDiv:
        "min-h-screen p-2 lg:px-20 lg:py-5  bg-linear-180 from-(--color-dark1) to-(--color-dark2) text-white",
      header: "bg-neutral-700/70 flex justify-between m-4 p-2 rounded-2xl",
      headerButton:
        "basis-10 cursor-pointer flex justify-center items-center rounded-lg text-white bg-neutral-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-neutral-600",
      logoImg: "focus:none filter-(--white-filter)",

      filterButtonActive:
        "shadow-sm border-1 border-red-900/10 cursor-pointer rounded-full bg-red-400 px-3 py-1 lg:basis-1/5 lg:self-center text-neutral-900 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-red-500",
      filterButtonInactive:
        "shadow-sm border-1 border-neutral-700 cursor-pointer rounded-full bg-neutral-700/70 py-1 px-3 lg:basis-1/3 lg:self-center text-white focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-neutral-600",

      card: "mt-3 lg:mt-0 py-2 px-3 bg-neutral-700/70 rounded-xl border-1 border-neutral-600 lg:h-[180px]",
      cardH2: "font-bold text-lg text-neutral-100",
      cardP: "text-neutral-300/60 lg:text-sm",
      cardButton:
        "cursor-pointer py-1 px-3 rounded-full border-1 border-neutral-300/50 text-neutral-100 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 hover:bg-red-400 hover:text-neutral-700",
    },
  };

  // functions
  function getdarkLightVariant() {
    return darkMode ? darkLightVariant.dark : darkLightVariant.light;
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function toggleDisplay(buttonName) {
    console.log("button", buttonName, "is clicked");
    setFilterExt(buttonName);
  }

  function toggleActive(id) {
    setDataState((prevState) => {
      console.log("id", id, "toggle is clicked");

      console.log("prevState", prevState);

      const newState = {};
      for (let key in prevState) {
        if (key === id) {
          newState[id] = {
            ...prevState[key],
            isActive: !prevState[key].isActive,
          };
        } else {
          newState[key] = { ...prevState[key] };
        }
      }
      console.log("newState", newState);
      return newState;
    });
  }

  function removeExt(id) {
    console.log("extension", id, "is removed");
    setDataState((prevState) => {
      const newState = {};
      for (let key in prevState) {
        if (key != id) {
          newState[key] = { ...prevState[key] };
        }
      }
      return newState;
    });
  }

  function getFinalDataArr() {
    if (filterExt === "all") {
      return dataArr;
    } else if (filterExt === "inactive") {
      return inactiveArr;
    } else {
      return activeArr;
    }
  }

  const finalDataArr = getFinalDataArr();

  const cardsElem = finalDataArr.map((item) => {
    return (
      <Card
        key={item.name}
        {...item}
        id={item.name}
        cardClass={getdarkLightVariant().card}
        cardH2Class={getdarkLightVariant().cardH2}
        cardPClass={getdarkLightVariant().cardP}
        cardButtonClass={getdarkLightVariant().cardButton}
        darkMode={darkMode}
        toggleActive={toggleActive}
        removeExt={removeExt}
      />
    );
  });

  return (
    <div className={getdarkLightVariant().mainDiv}>
      <Header
        headerClass={getdarkLightVariant().header}
        buttonClass={getdarkLightVariant().headerButton}
        logoImgClass={getdarkLightVariant().logoImg}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main className="text-center pb-10">
        <div className="lg:flex lg:justify-between lg:m-4">
          <h1 className="my-5 text-3xl font-bold">Extensions List</h1>
          <div className="my-3 flex gap-3 justify-center lg:basis-1/5">
            <button
              onClick={() => toggleDisplay("all")}
              className={
                filterExt === "all"
                  ? getdarkLightVariant().filterButtonActive
                  : getdarkLightVariant().filterButtonInactive
              }
              aria-label="Show all extensions">
              All
            </button>
            <button
              onClick={() => toggleDisplay("active")}
              className={
                filterExt === "active"
                  ? getdarkLightVariant().filterButtonActive
                  : getdarkLightVariant().filterButtonInactive
              }
              aria-label="Show active extensions">
              Active
            </button>
            <button
              onClick={() => toggleDisplay("inactive")}
              className={
                filterExt === "inactive"
                  ? getdarkLightVariant().filterButtonActive
                  : getdarkLightVariant().filterButtonInactive
              }
              aria-label="Show inactive extensions">
              Inactive
            </button>
          </div>
        </div>

        <div className="m-4 p-2 lg:p-0 lg:grid lg:grid-cols-3 lg:gap-3 ">
          {cardsElem}
        </div>
      </main>
    </div>
  );
}

export default App;
