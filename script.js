// Character substitution mapping
const SPECIAL_CHAR_MAP = {
  a: "@",
  b: "8",
  c: "(",
  d: ")",
  e: "€",
  f: "ph",
  g: "9",
  h: "#",
  i: "!",
  j: "]",
  k: "|<",
  l: "1",
  m: "^^",
  n: "^",
  o: "0",
  p: "|>",
  q: "9",
  r: "|2",
  s: "$",
  t: "7",
  u: "(_)",
  v: "\\/",
  w: "vv",
  x: "%",
  y: "`/",
  z: "2",
};

// Available divider characters
const DIVIDERS = ["-", "_", "*", "/", "|", "+", "=", "~", "."];

// DOM Elements
const userInput = document.getElementById("user-input");
const generateBtn = document.getElementById("generate-btn");
const generatedPassword = document.getElementById("generated-password");
const copyBtn = document.getElementById("copy-btn");

// 1. Input validation and processing
const validateInput = (input) => {
  // Remove spaces and convert to lowercase
  const cleanInput = input.replace(/\s/g, "").toLowerCase();

  // Check length requirements
  if (cleanInput.length < 4) {
    return {
      isValid: false,
      error: "Password must be at least 4 characters long",
      cleanInput: null,
    };
  }
  if (cleanInput.length > 12) {
    return {
      isValid: false,
      error: "Password must be no more than 12 characters long",
      cleanInput: null,
    };
  }

  // Check for non-letter characters
  if (!/^[a-zA-Z]+$/.test(cleanInput)) {
    return {
      isValid: false,
      error: "Only letters are allowed",
      cleanInput: null,
    };
  }

  return { isValid: true, error: null, cleanInput: cleanInput };
};

const handleInputChange = (e) => {
  // Allow letters and spaces, but remove all other characters
  let cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");

  // Update input value if it changed (e.g., if a number was typed)
  if (cleanValue !== e.target.value) {
    e.target.value = cleanValue;
  }

  // For visual feedback, check the length *without* spaces
  const lengthCheckValue = cleanValue.replace(/\s/g, "");
  const input = e.target;

  if (lengthCheckValue.length === 0) {
    input.style.borderColor = "#ccc"; // neutral
  } else if (lengthCheckValue.length < 4) {
    input.style.borderColor = "#ff6b6b"; // red - too short
  } else if (lengthCheckValue.length <= 12) {
    input.style.borderColor = "#51cf66"; // green - good length
  }
};

// 2. String splitting logic
const splitString = (cleanString) => {
  const len = cleanString.length;

  return Math.random() < 0.5
    ? // Two cuts logic (true branch)
      (() => {
        let cut1 = Math.floor(Math.random() * (len - 1)) + 1;
        let cut2;
        do {
          cut2 = Math.floor(Math.random() * (len - 1)) + 1;
        } while (cut1 === cut2);

        const [first, second] = [cut1, cut2].sort((a, b) => a - b);
        return [
          cleanString.slice(0, first),
          cleanString.slice(first, second),
          cleanString.slice(second),
        ];
      })()
    : // One cut logic (false branch)
      (() => {
        const cut = Math.floor(Math.random() * (len - 1)) + 1;
        return [cleanString.slice(0, cut), cleanString.slice(cut)];
      })();
};

// 3. Random casing transformation
const switchCasing = (stringSegments) => {
  const randomIndex = Math.floor(Math.random() * stringSegments.length);
  return stringSegments.map((segment, index) =>
    index === randomIndex ? segment.toUpperCase() : segment
  );
};

// 4. Insert divider characters
const addDividers = (segments) => {
  let finalString = segments[0];

  // Loop through the remaining segments to add dividers in the "gaps"
  for (let i = 1; i < segments.length; i++) {
    const dividerLength = Math.floor(Math.random() * 3) + 1;

    const divider = Array.from(
      { length: dividerLength },
      () => DIVIDERS[Math.floor(Math.random() * DIVIDERS.length)]
    ).join("");

    finalString += divider + segments[i];
  }
  return finalString;
};

// 5. Character substitution
const substituteCharacters = (password) => {
  const possibleIndices = password
    .split("")
    .map((char, index) => (SPECIAL_CHAR_MAP[char.toLowerCase()] ? index : -1))
    .filter((index) => index !== -1);

  const swapCount = Math.min(
    possibleIndices.length,
    Math.floor(Math.random() * 3) + 2
  );

  const indicesToSwap = new Set(
    possibleIndices.sort(() => 0.5 - Math.random()).slice(0, swapCount)
  );

  return password
    .split("")
    .map((char, index) =>
      indicesToSwap.has(index) ? SPECIAL_CHAR_MAP[char.toLowerCase()] : char
    )
    .join("");
};

// 6. Append random numbers
const appendNumbers = (password) => {
  const randomNumber =
    Math.random() < 0.5
      ? Math.floor(Math.random() * 90) + 10
      : Math.floor(Math.random() * 900) + 100;

  return `${password}${randomNumber}`;
};

// 7. Display the result
const displayOutput = (finalPassword) => {
  generatedPassword.value = finalPassword; // Correct
  copyBtn.disabled = false;
  copyBtn.textContent = "Copy";
};

// Main password generation orchestrator
const generatePassword = () => {
  const validation = validateInput(userInput.value);

  if (!validation.isValid) {
    alert(validation.error); // Simple error handling
    return;
  }

  // The chain of functions
  const segments = splitString(validation.cleanInput);
  const casedSegments = switchCasing(segments);
  const dividedString = addDividers(casedSegments);
  const substitutedString = substituteCharacters(dividedString);
  const finalPassword = appendNumbers(substitutedString);

  displayOutput(finalPassword);
};

// Copy to clipboard functionality
const copyToClipboard = async () => {
  const textToCopy = generatedPassword.value; // Correct
  if (!textToCopy) return;

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

// Event listeners
const setupEventListeners = () => {
  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyToClipboard);
  userInput.addEventListener("input", handleInputChange);
};

// Initialize the app
const initializeApp = () => {
  copyBtn.disabled = true;
  setupEventListeners();
};

// Start the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
