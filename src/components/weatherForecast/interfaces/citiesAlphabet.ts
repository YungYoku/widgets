export const russianAlphabet = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "э", "ю", "я"] as const;

export const isLetterOfRussianAlphabet = (letter: string): letter is typeof russianAlphabet[number] => {
  return !!russianAlphabet.find(item => item === letter);
};

export interface CitiesAlphabet {
  "а": Array<string>;
  "б": Array<string>;
  "в": Array<string>;
  "г": Array<string>;
  "д": Array<string>;
  "е": Array<string>;
  "ё": Array<string>;
  "ж": Array<string>;
  "з": Array<string>;
  "и": Array<string>;
  "й": Array<string>;
  "к": Array<string>;
  "л": Array<string>;
  "м": Array<string>;
  "н": Array<string>;
  "о": Array<string>;
  "п": Array<string>;
  "р": Array<string>;
  "с": Array<string>;
  "т": Array<string>;
  "у": Array<string>;
  "ф": Array<string>;
  "х": Array<string>;
  "ц": Array<string>;
  "ч": Array<string>;
  "ш": Array<string>;
  "щ": Array<string>;
  "ъ": Array<string>;
  "ы": Array<string>;
  "ь": Array<string>;
  "э": Array<string>;
  "ю": Array<string>;
  "я": Array<string>;

  [key: string]: Array<string>;
}