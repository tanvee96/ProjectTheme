export const dateConversion = (date) => {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var mm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();
    const convDate = dd + " " + mm + ", " + yyyy;
    return convDate;
};
