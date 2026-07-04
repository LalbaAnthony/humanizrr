# 🤖 - humanizrr

humanizrr is a Node.js library that provides methods for humanizing strings for AI-generated content.

Available at: [https://www.npmjs.com/package/humanizrr](https://www.npmjs.com/package/humanizrr)

## 🚀 - Installation

```bash
npm install humanizrr
```

## ✒️ - Usage

```ts
import humanizrr from 'humanizrr';

const text = "Life is like a box of chocolates. You never know what you're gonna get.";

// With default options
console.log(humanizrr.typos.make(text));
// e.g. "Life is like a bxo of chocolates. You never knw what you're gonna gett."

// With custom options
console.log(humanizrr.typos.make(text, {
    types: {
        swap: 0.01,      // swap a letter with the next one
        map: 0.02,       // replace a letter with an adjacent key on the keyboard
        duplicate: 0.02, // duplicate a letter
        drop: 0.02,      // remove a letter
    },
    keyboard: {
        layout: 'qwerty', // 'qwerty' or 'azerty', used by the "map" type
    },
}));
```

### Typo Options

| Option            | Type                   | Default                                                  | Description                                                                                                     |
| ----------------- | ---------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `types`           | `object`               | `{ swap: 0.01, map: 0.02, duplicate: 0.02, drop: 0.02 }` | Probability (between `0` and `1`) for each typo type to be applied per letter. Set a type to `0` to disable it. |
| `keyboard.layout` | `'qwerty' \| 'azerty'` | `'qwerty'`                                               | Keyboard layout used by the `map` type to pick adjacent keys.                                                   |

### Typo types

- `swap` — swaps a letter with the next one
- `map` — replaces a letter with an adjacent key on the keyboard layout (case is preserved)
- `duplicate` — duplicates a letter
- `drop` — removes a letter

## 🛠️ - Development

```bash
# Prepare a release build
npm pack --dry-run

# Bump version and push tags
npm version patch
git push --follow-tags
```

## 📄 - License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.