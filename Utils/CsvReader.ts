import * as fs from 'fs';
import * as path from 'path';

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
}
