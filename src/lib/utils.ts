import {
  readFileSync,
  writeFileSync,
  existsSync,
} from 'fs';

export function updateJson<T extends object = any, U extends object = T>(
  filePath: string,
  updater: (value: T) => U
) {
  if (!existsSync(filePath)) return;

  const fileContent = readFileSync(filePath);
  const json = JSON.parse(fileContent.toString());
  const jsonContent = JSON.stringify(updater(json), null, 2);

  writeFileSync(filePath, jsonContent);
}
