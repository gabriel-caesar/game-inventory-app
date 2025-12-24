exports.normalizeString = (str) => {
  return str
    .trim()
    .split('')
    .map((l, i) => {
      if (i === 0) return l.toUpperCase();
      else if (str[i - 1].match(/\s/)) return l.toUpperCase();
      else return l.toLowerCase();
    })
    .join('');
}