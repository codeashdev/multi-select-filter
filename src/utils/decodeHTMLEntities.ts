export const decodeHTMLEntities =(text: string): string => {
    const entities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
    };
  
    return text.replace(/&[a-zA-Z]+;|&#\d+;/g, (match) => {
      return entities[match] || match;
    });
  }