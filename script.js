// =================================================================
// CONFIGURATION & CONSTANTS
// =================================================================

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
  k: "<",
  l: "1",
  m: "^^",
  n: "^",
  o: "0",
  p: ">",
  q: "9",
  r: "|2",
  s: "$",
  t: "7",
  u: "v",
  v: "\\/",
  w: "vv",
  x: "%",
  y: "`/",
  z: "2",
};

const DIVIDERS = ["-", "_", "*", "/", "|", "+", "=", "~", "."];

// =================================================================
// CORE PASSWORD GENERATION LOGIC
// =================================================================

const passwordTransformer = {
  /**
   * Splits a string into two or three random segments.
   * @param {string} cleanString The input string to split.
   * @returns {string[]} An array of string segments.
   */

  splitString(cleanString) {
    const len = cleanString.length;
    const possibleCuts = Array.from({ length: len - 1 }, (_, i) => i + 1); // Generate possible cut indices
    const numCuts = Math.random() < 0.5 ? 1 : 2; // Decide to make 1 or 2 cuts
    const cuts = possibleCuts
      .sort(() => 0.5 - Math.random())
      .slice(0, numCuts)
      .sort((a, b) => a - b);
    const segments = [];
    let lastCut = 0;
    for (const cut of cuts) {
      segments.push(cleanString.slice(lastCut, cut));
      lastCut = cut;
    }
    segments.push(cleanString.slice(lastCut));
    return segments;
  },

  /**
   * Randomly converts one segment of a string array to uppercase.
   * @param {string[]} stringSegments An array of string segments.
   * @returns {string[]} The array with one segment capitalized.
   */

  switchCasing(stringSegments) {
    const randomIndex = Math.floor(Math.random() * stringSegments.length);
    return stringSegments.map((segment, index) =>
      index === randomIndex ? segment.toUpperCase() : segment
    );
  },

  /**
   * Joins string segments together with random divider characters.
   * @param {string[]} segments The array of string segments to join.
   * @returns {string} The final string with dividers.
   */

  addDividers(segments) {
    let finalString = segments[0];
    for (let i = 1; i < segments.length; i++) {
      const dividerLength = Math.floor(Math.random() * 3) + 1;

      const divider = Array.from(
        { length: dividerLength },
        () => DIVIDERS[Math.floor(Math.random() * DIVIDERS.length)]
      ).join("");

      finalString += divider + segments[i];
    }
    return finalString;
  },

  /**
   * Replaces a random number of characters with special characters.
   * @param {string} password The password string to modify.
   * @returns {string} The password with characters substituted.
   */

  substituteCharacters(password) {
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
  },

  /**
   * Appends a random 2 or 3-digit number to the end of a string.
   * @param {string} password The password string to append to.
   * @returns {string} The password with the number appended.
   */

  appendNumbers(password) {
    const randomNumber =
      Math.random() < 0.5
        ? Math.floor(Math.random() * 90) + 10
        : Math.floor(Math.random() * 900) + 100;
    return `${password}${randomNumber}`;
  },
};

// =================================================================
// DOM INTERACTION & EVENT HANDLERS
// =================================================================

// DOM Elements
const userInput = document.getElementById("user-input");
const generateBtn = document.getElementById("generate-btn");
const generatedPassword = document.getElementById("generated-password");
const copyBtn = document.getElementById("copy-btn");
const errorMessage = document.getElementById("error-message");

/**
 * Validates the user's input string based on length and character type.
 * @param {string} input The raw string from the user input field.
 * @returns {{isValid: boolean, error: string|null, cleanInput: string|null}} An object with validation status.
 */

const validateInput = (input) => {
  const cleanInput = input.replace(/\s/g, "").toLowerCase();
  if (cleanInput.length < 4) {
    return {
      isValid: false,
      error: "Password must be at least 4 characters long",
      cleanInput: null,
    };
  }
  if (cleanInput.length > 16) {
    return {
      isValid: false,
      error: "Password must be no more than 16 characters long",
      cleanInput: null,
    };
  }
  if (!/^[a-zA-Z]+$/.test(cleanInput)) {
    return {
      isValid: false,
      error: "Only letters are allowed",
      cleanInput: null,
    };
  }

  return { isValid: true, error: null, cleanInput: cleanInput };
};

/**
 * Handles real-time input events for validation feedback and character filtering.
 * @param {Event} e The input event object.
 */

const handleInputChange = (e) => {
  let cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  if (cleanValue !== e.target.value) {
    e.target.value = cleanValue;
  }
  const lengthCheckValue = cleanValue.replace(/\s/g, "");
  const input = e.target;
  input.classList.remove("valid", "invalid"); // Reset classes first
  if (lengthCheckValue.length > 0) {
    if (lengthCheckValue.length < 4 || lengthCheckValue.length > 16) {
      input.classList.add("invalid");
    } else {
      input.classList.add("valid");
    }
  }
};

/**
 * Displays the generated password in the output field and enables the copy button.
 * @param {string} finalPassword The password to display.
 */

const displayOutput = (finalPassword) => {
  generatedPassword.value = finalPassword;
  copyBtn.disabled = false;
  copyBtn.textContent = "Copy";
};

/**
 * The main function that orchestrates the password generation process.
 */

const generatePassword = () => {
  const validation = validateInput(userInput.value);
  if (!validation.isValid) {
    errorMessage.textContent = validation.error;
    return;
  }
  const segments = passwordTransformer.splitString(validation.cleanInput);
  const casedSegments = passwordTransformer.switchCasing(segments);
  const dividedString = passwordTransformer.addDividers(casedSegments);
  const substitutedString =
    passwordTransformer.substituteCharacters(dividedString);
  const finalPassword = passwordTransformer.appendNumbers(substitutedString);
  displayOutput(finalPassword);
  errorMessage.textContent = "";
};

/**
 * Copies the generated password from the output field to the user's clipboard.
 */

const copyToClipboard = async () => {
  const textToCopy = generatedPassword.value;
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

/**
 * Attaches all necessary event listeners to the DOM elements.
 */

const setupEventListeners = () => {
  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyToClipboard);
  userInput.addEventListener("input", handleInputChange);
};

// =================================================================
// INITIALIZATION
// =================================================================

/**
 * Initializes the application by disabling the copy button and setting up event listeners.
 */

const initializeApp = () => {
  copyBtn.disabled = true;
  setupEventListeners();
};

document.addEventListener("DOMContentLoaded", initializeApp);
