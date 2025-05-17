import fs from "fs";
import * as datefns from "date-fns"; // library that displays dates nicely

// handy to console log when debugging
const dump = (obj) => {
  if (Object.keys(obj).length === 0) {
    console.log("Empty object");
    return;
  }
  return JSON.stringify(obj, null, 2);
};

// Format date using date-fns
const formatDate = (date) => {
  if (!date) return '';
  return datefns.format(date, 'MMMM d, yyyy h:mm a');
};

// insert svg icon
const icon = (iconName) => fs.readFileSync(`./public/icons/${iconName}.svg`);
const siteName = `Notes App`;

const menu = [
  {
    slug: "/notes",
    title: "Notes",
    icon: "note"
  },
  {
    slug: "/notes/add",
    title: "Add Note",
    icon: "note"
  }
];

export default {
  datefns,
  dump,
  formatDate,
  icon,
  siteName,
  menu,
};
