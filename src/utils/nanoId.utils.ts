export async function generateToken() {
  const { nanoid } = await import('nanoid')
  return nanoid(32)
}
