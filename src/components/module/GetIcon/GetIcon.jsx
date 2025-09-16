const icons_light = import.meta.glob("../../../assist/svg/light/*.svg", {
  eager: true,
  as: "component",
});
const icons_dark = import.meta.glob("../../../assist/svg/dark/*.svg", {
  eager: true,
  as: "component",
});

export default function GetIcon({ name, theme = "light" }) {
  console.log(icons_light);

  const isLight = theme == "light";
  const toEntries = isLight ? icons_light : icons_dark;

  const icon_list = Object.entries(toEntries).map(([path, module]) => {
    return {
      name: path.split("/").pop().replace(".svg", ""), // file name <<
      Component: module.default, // component <<
    };
  });

  const Icon = icon_list.find((icon) => icon.name == name);
  if (!Icon) {
    console.warn("Icon not found in the GetIcon ");
    return null;
  }
  console.log(Icon.Component);// مشکل اینه اینجا بجای اینکه کامپونت بده داره url data میده !!!!!!!!!

  return <span>icon</span>;
}
