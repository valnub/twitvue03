var util = {
};

util.dateDiff = function(a, b) {
  let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
  let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds());

  let result = (utc2 - utc1) / (1000 * 60 * 60 * 24);
  let floor = Math.floor(result);
  if (floor > 0) return floor + "d";

  result *= 24;
  floor = Math.floor(result);
  if (floor > 0) return floor + "h";

  result *= 60;
  floor = Math.floor(result);
  if (floor > 0) return floor + "min";

  result *= 60;
  floor = Math.floor(result);
  if (floor > 0) return floor + "sec";
}

export default util;