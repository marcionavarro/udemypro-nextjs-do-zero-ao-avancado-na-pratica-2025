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

export async function getSubMenu () {
  try {
     let urlCosmicSubMenu = `${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D`
     urlCosmicSubMenu += `&limit=10&skip=0&read_key=${process.env.READ_KEY}&depth=1&props=slug,title`
    const res = await fetch(urlCosmicSubMenu)
    if (!res.ok) {
      throw new Error("Failed to fetch menu data")
    }

    return res.json()
  } catch (error) {
    throw new Error("Failed to fetch menu data")
  }
}