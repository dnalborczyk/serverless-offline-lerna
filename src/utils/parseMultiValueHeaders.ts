import unflatten from './unflatten'

const { fromEntries } = Object

// https://aws.amazon.com/blogs/compute/support-for-multi-value-parameters-in-amazon-api-gateway/
export default function parseMultiValueHeaders(rawHeaders: string[]) {
  if (rawHeaders.length === 0) {
    return null
  }

  const map = new Map()
  const unflattened = unflatten(rawHeaders, 2)

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of unflattened) {
    const item = map.get(key)

    if (item) {
      item.push(value)
    } else {
      map.set(key, [value])
    }
  }

  return fromEntries(map)
}
