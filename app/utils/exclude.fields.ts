// Exclude field(s) way

function exclude(entity: any, keys: string[]) {
  return Object.fromEntries(
    Object.entries(entity).filter(([key]) => !keys.includes(key)),
  );
}

export default exclude;
