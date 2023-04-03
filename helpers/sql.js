const { BadRequestError } = require("../expressError");

/** 
 * Helper function that generates SQL query for partial updates.
 * 
 * @param {Object} dataToUpdate - An object that contains the data to be updated.
 * @param {Object} [jsToSql] - Optional object that maps JavaScript object keys to SQL column names.
 * @returns {Object} - An object with two properties: setCols and values.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // extracts keys from the dataToUpdate object
  const keys = Object.keys(dataToUpdate);

  // if there are no keys, then throw a BadRequestError with a message 'No data'
  if (keys.length === 0) throw new BadRequestError("No data");

  // maps keys of the dataToUpdate object to SQL column-value pairs
  // if a key in dataToUpdate matches a key in jsToSql, use the corresponding SQL column name instead of the JS key

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // returns an object with two properties: setCols and values
  // setCols is a string of comma-separated SQL column-value pairs
  // values is an array of values to be used in the SQL query, in the order they appear in setCols
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
