import { Injectable } from '@nestjs/common';
import { Source } from './models';

@Injectable()
export class AppService {
  keyMap = {
    '1': [''],
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
    '*': ['+'],
    '0': [' '],
    '#': ['UPPERCASE'],
    '.': [''],
  };

  keyMapReverse = {
    a: '2',
    b: '22',
    c: '222',
    d: '3',
    e: '33',
    f: '333',
    g: '4',
    h: '44',
    i: '444',
    j: '5',
    k: '55',
    l: '555',
    m: '6',
    n: '66',
    o: '666',
    p: '7',
    q: '77',
    r: '777',
    s: '7777',
    t: '8',
    u: '88',
    v: '888',
    w: '9',
    x: '99',
    y: '999',
    z: '9999',
  };

  translate(message: string, source: Source): string {
    switch (source) {
      case 'earth':
        return this.translateToNokia(message);
      case 'mars':
        return this.translateToEnglish(message);

      default:
        return '';
    }
  }

  translateToNokia(message: string) {
    let translatedString = '';
    for (const char of message) {
      if (char in this.keyMapReverse) {
        translatedString += this.keyMapReverse[char];
      } else {
        translatedString += char;
      }
    }

    return translatedString;
  }

  translateToEnglish(codedMessage: string): string {
    const messageArr = codedMessage.split(' ');
    let translatedText = '';
    for (const word of messageArr) {
      let translatedWord = '';

      const wordArr = this.splitSameCharSubstrings(word);
      for (const digits of wordArr) {
        if (digits.length > 3) {
          const splittedDigits = [];
          if (digits.includes('7') || digits.includes('9')) {
            for (let i = 0; i < digits.length; i += 4) {
              const s = digits.substring(i, i + 4);

              splittedDigits.push(s);
            }
          } else {
            for (let i = 0; i < digits.length; i += 3) {
              const s = digits.substring(i, i + 3);

              splittedDigits.push(s);
            }
          }
          for (const d of splittedDigits) {
            translatedWord += this.keyMap[d[0]][d.length - 1];
          }
        } else {
          translatedWord += this.keyMap[digits[0]][digits.length - 1];
        }
      }

      translatedText += translatedWord + ' ';
    }
    return translatedText.trim();
  }

  splitSameCharSubstrings(input: string): string[] {
    const substrings = [];
    let currentSubstring = '';

    for (let i = 0; i < input.length; i++) {
      if (input[i] === currentSubstring[0] || currentSubstring === '') {
        currentSubstring += input[i];
      } else {
        substrings.push(currentSubstring);
        currentSubstring = input[i];
      }
    }

    if (currentSubstring !== '') {
      substrings.push(currentSubstring);
    }

    return substrings;
  }
}
