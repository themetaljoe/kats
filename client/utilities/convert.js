export default (str) => {
  return str.split("WAS")[0].replace(/\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    .replace(/Brand: /g, "").replace(/A&l/g, "Art and Lutherie")
    .replace(/B&s/g, 'Back And Sides').replace(/Color: /g, "")
    .replace(/Model: /g, "").replace(/Musical Instrument/g, "")
    .replace(/ *\([^)]*\) */g, "").replace(/&/g, " and ")
    .replace(/ \//g,', ').replace('/\-/', ', ').replace(/c\/e/g, "c / E")
    .replace(/  /g, " ");
}
