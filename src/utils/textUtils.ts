const convertToTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

export default convertToTitleCase;
