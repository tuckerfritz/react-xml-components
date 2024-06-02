function isValidElementNameProp(name: string) {
  try {
    const doc = `<${name}></${name}>`;
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(doc, "application/xml");
    return parsedDoc.documentElement.nodeName !== "parsererror";
  } catch (error: unknown) {
    return false;
  }
}

export default isValidElementNameProp;
