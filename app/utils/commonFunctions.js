export const toCamelCase = (str) =>{
    return str?.replace(/\b\w/g, (c) => c.toUpperCase())
}