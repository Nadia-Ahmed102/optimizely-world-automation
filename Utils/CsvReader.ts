import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export class CsvReader {

  /**
   * Reads a column from a CSV file located at your local path.
   * Skips the header row.
   * @param fileName - CSV file name in testData directory
   * @param columnIndex - Index of column to read (default is 0)
   * @returns Array of string values from the specified column
   */
  static readColumnFromCsv(fileName: string, columnIndex: number = 0): string[] {
    const filePath = path.resolve(
      './testData',
      fileName
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8').trim();
    const lines = content.split('\n');

    // Skip header row
    lines.shift();

    const values = lines.map((line, index) => {
      const cols = line.split(',');
      if (cols[columnIndex] === undefined) {
        throw new Error(`Missing column at index ${columnIndex} on line ${index + 2}`);
      }
      return cols[columnIndex].trim();
    });

    return values;
  }

  /**
   * Reads a two-column CSV file into a Map of key-value pairs.
   * The first row is expected to be the headers, and subsequent rows are data.
   *
   * @param fileName - The name of the CSV file in the testData directory.
   * @returns A Map containing the parsed key-value pairs.
   */
  static readKeyValueCsv(fileName: string): Map<string, string> {

    const filePath = path.resolve(
      './testData',
      fileName
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records: string[][] = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
    });

    // Skip the header row and create a Map from the remaining rows
    const dataMap = new Map<string, string>();
    for (let i = 1; i < records.length; i++) {
      const [key, value] = records[i];
      if (key && value) {
        dataMap.set(key.trim(), value.trim());
      }
    }
    return dataMap;
  }

}
