# Password Generator

A web-based password generator that transforms memorable words into secure passwords while maintaining their memorability.

## Features

- Memory-friendly: Start with a word or phrase you can remember
- Secure transformation: Multiple randomization techniques ensure strong passwords
- Real-time validation with instant feedback
- One-click copy to clipboard
- Responsive design for all devices

## How It Works

The generator uses a multi-step randomization process:

1. **Input Validation**: Accepts 4-16 letter words/phrases
2. **String Splitting**: Randomly divides input into 2-3 segments
3. **Case Transformation**: Randomly capitalizes one segment
4. **Special Dividers**: Inserts random special characters between segments
5. **Character Substitution**: Replaces 2-4 letters with similar special characters (a→@, e→€, o→0, etc.)
6. **Number Appending**: Adds a random 2-3 digit number at the end

Example: "red giraffe" becomes `re)gir@f-F.-*€38`

## Usage

1. Open `index.html` in your web browser
2. Enter a memorable word (4-16 letters, letters only)
3. Click "Generate Password"
4. Copy your new secure password

No build process or dependencies required.

## Project Structure

```
password-generator/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS styling
├── script.js           # Core JavaScript logic
└── brainstorm.txt      # Project planning document
```

## Code Architecture

### Core Components

- **passwordTransformer**: Main logic object containing all transformation methods
- **validateInput()**: Input validation and sanitization
- **generatePassword()**: Orchestrates the password generation process
- **Event Listeners**: Handle user interactions and real-time feedback

### Key Functions

- `splitString()`: Randomly segments input string
- `switchCasing()`: Applies random capitalization
- `addDividers()`: Inserts special character separators
- `substituteCharacters()`: Replaces letters with special characters
- `appendNumbers()`: Adds random digits

## Security

- Ensures mix of uppercase, lowercase, numbers, and symbols
- Different output each time, even with same input
- No storage or logging of passwords
- All processing happens client-side in the browser

## License

This project is open source and available under the MIT License.