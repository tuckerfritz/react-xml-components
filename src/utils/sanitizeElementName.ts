export function validateElementName(name: string) {
  for (let i = 0; i < name.length; ++i) {
    const char = name[i];
    switch (char) {
      case "/":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "@":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "[":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "]":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "<":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "*":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "(":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case ")":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
      case "|":
        throw new Error(
          `Illegal character ${char} found in element name ${name}`,
        );
    }
  }
}
