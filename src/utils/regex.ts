export function removeSpecialValues(name: string) {
  return name.replace(/[^\w\s]/g, '')
}
