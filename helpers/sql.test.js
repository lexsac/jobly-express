const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', () => {
  test('generates SQL query for partial updates', () => {
    const dataToUpdate = {
      firstName: 'Alice',
      age: 30,
    };
    const jsToSql = {
      firstName: 'first_name',
    };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ['Alice', 30],
    });
  });

  test('generates SQL query without jsToSql', () => {
    const dataToUpdate = {
      firstName: 'Bob',
      age: 25,
    };
    const result = sqlForPartialUpdate(dataToUpdate, {});
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ['Bob', 25],
    });
  });

  test('throws BadRequestError when no data is provided', () => {
    const dataToUpdate = {};
    expect(() => {
      sqlForPartialUpdate(dataToUpdate);
    }).toThrow(BadRequestError);
    expect(() => {
      sqlForPartialUpdate(dataToUpdate);
    }).toThrow('No data');
  });
});