export default function Toggle({
  cardId,
  darkMode,
  toggleChecked,
  toggleActive,
}) {
  const toggleFillVariant = {
    light: `
          // the main body
          bg-neutral-300 relative w-(--toggle-w) h-(--toggle-h) rounded-(--toggle-br) 
          peer-checked:bg-red-700 transition-(--toggle-fill-transition)
          hover:bg-red-500
        
          // positioning the thumb before checked
          after:absolute after:top-0 after:left-0 after:mt-[2.5px] after:ml-[2.5px]
          after:h-(--toggle-fill-unchecked-hw) after:w-(--toggle-fill-unchecked-hw)
          after:transition-(--toggle-fill-transition)
          after:rounded-(--toggle-br) after:bg-neutral-100

          // positioning the thumb after checked
          peer-checked:after:translate-x-(--toggle-h)
        `,
    dark: `
          // the main body
          bg-neutral-600 relative w-(--toggle-w) h-(--toggle-h) rounded-(--toggle-br) 
          peer-checked:bg-red-400 transition-(--toggle-fill-transition)
          hover:bg-red-500
        
          // positioning the thumb before checked
          after:absolute after:top-0 after:left-0 after:mt-[2.5px] after:ml-[2.5px]
          after:h-(--toggle-fill-unchecked-hw) after:w-(--toggle-fill-unchecked-hw)
          after:transition-(--toggle-fill-transition)
          after:rounded-(--toggle-br) after:bg-neutral-100

          // positioning the thumb after checked
          peer-checked:after:translate-x-(--toggle-h)
        `,
  };
  return (
    <>
      {/* toggle */}
      <label
        className="inline-block cursor-pointer rounded-full
      focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-red-400
      
      ">
        <input
          className="peer h-0 w-0 sr-only"
          type="checkbox"
          name="active"
          id="active"
          checked={toggleChecked}
          onChange={() => toggleActive(cardId)}
        />

        {/* toggle fill */}
        <div
          className={
            darkMode ? toggleFillVariant.dark : toggleFillVariant.light
          }></div>
      </label>
    </>
  );
}
