const PRIMITIVE_TYPES = ['string', 'number', 'boolean'];

export const joinStrings = (strings: string[]) => {
  const targets = strings.filter((string) => {
    return PRIMITIVE_TYPES.includes(typeof string);
  });

  return targets.join(' ');
};
