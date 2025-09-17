# Overview:

For this project, you will build a message generator program. Every time a user runs a program, they should get a new, randomized output. You’re welcome to take the project in a couple of different forms, like an astrology generator, inspirational message, or nonsensical jokes. To make your program truly random, the message that it outputs should be made up of at least three different pieces of data. Take what you know of JavaScript syntax so far to build the program and customize it to your liking.

# Initial Ideas:

- motivational quotes
- outfit combinations
- color combinations
- javascript shortcuts
- user types a string of random letters (e.g., max 10) and the program outputs a sentence where each word starts with the respective initial
- username generation
- password generator: input a string and the program spices it up with random characters, but keeps it easy to remember

I like the password idea. Let's build upon it.

# Password Generator

- UX:
  User types a string they would like to base their password on
  System returns a more abstract version of the input string (could give option to input a number as well)

- Logic:
  May want to cap the number of characters entered (e.g., 10)
  Minimum numbers of special characters and upper/lowercase letters
  Minimum total length
  Some characters get replaced with similar variations (e.g., o with 0, s with $, e with €, etc.)
  Based on a random function, can vary: pw length, whether a character gets replaced or not, where the keyword gets split, etc

- UI: Minimal; one text bar where the user types their word, one button to hit enter
  Button to copy and paste
  Interactive features (e.g., for hover, active states)
  Clean colors
  Grey text saying: "we recommend choosing an interesting word you can easily remember..."

## Process:

1. Take a string with varying length as input
2. If the string is invalid, show error message (e.g., if it contains certain characters, is too long/short)
3. The program will aim to make the string a "safer" password by:
   splitting the string in 2/3 portions
   change casing of letters in one portion
   inserting special characters between the portions
   replacing certain characters with similar variations
   appending digits at the end
4. Each of the above will be based on a random function, meaning that the program will return a different variant of the password each time

## Required functions

1. Input function
   cap length to 10~15 characters
   require min length of 4~5 characters
   return error messages for special characters, pw too short/long
   convert all to lowercase for internal manipulation

2. String splitter
   randomly choose if the string gets split once or twice
   randomly make the cut(s): must be between the first and last letters of the input

3. Casing switch
   pick one section
   make it all caps

4. Special character dividers
   choose from a set of clear dividers (-, \_, \*, /, etc)
   randomly choose how many (1~3)
   insert these between the portions

5. Special character switch
   every letter in the alphabet has at least an alternative special character resembling it
   randomly pick a random amount of letters in the current string (2~4)
   switch the letter to the special character from the set

6. Number appender
   generate a random 1~3 digit number
   append it to the end of our password

7. Output function
   the new password is now complete
   display the password in its own container after the user submits
