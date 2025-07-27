export function setClassName(name: string) {
  return `menu-${name.replace(' ', '-').toLowerCase()}`;
}
