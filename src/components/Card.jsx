import Toggle from "./Toggle";

export default function Card(props) {
  const {
    id,
    description,
    isActive,
    logo,
    name,
    cardClass,
    cardH2Class,
    cardPClass,
    cardButtonClass,
    darkMode,
    toggleActive,
    removeExt,
  } = props;

  const logoSrc = logo.split("./assets/images/")[1];

  return (
    <div className={cardClass}>
      <div
        className="flex gap-3 items-start
        lg:h-[100px]
      ">
        <img src={logoSrc} alt={`${name} extension logo`} />
        <div className="text-left">
          <h2 className={cardH2Class}>{name}</h2>
          <p className={cardPClass}>{description}</p>
        </div>
      </div>
      <div className="mt-3 lg:mt-4 flex justify-between items-center">
        <button className={cardButtonClass} onClick={() => removeExt(id)}>
          Remove
        </button>
        <Toggle
          cardId={id}
          darkMode={darkMode}
          toggleChecked={isActive}
          toggleActive={toggleActive}
        />
      </div>
    </div>
  );
}
