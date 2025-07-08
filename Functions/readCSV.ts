// readCSV.ts
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readMenuItemsFromCSV(filePath: string): string[] {
  const csv = fs.readFileSync(filePath, 'utf-8');
  const records = parse(csv, { columns: false, skip_empty_lines: true });
  return records.flat().map((text: string) => text.trim());
}
