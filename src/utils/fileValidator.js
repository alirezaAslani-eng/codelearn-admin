const valid_format = ["image/jpg", "image/png", "image/jpeg"];
export default function fileValidator(file) {
  if (!file) return false;
  else if (!valid_format.includes(file.type)) return false;
  else return true;
}
