export const getCurrentDateAndTime = () =>
  new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "medium",
  });
    
