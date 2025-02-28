export async function getDataHome() {
  try {
    let urlCosmic = `${process.env.NEXT_PUBLIC_API_URL}/objects/67c0c634447e7fbe811b33a5`
    urlCosmic += `?pretty=true&read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata,type`
    const res = await fetch(urlCosmic)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    return res.json()

  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}