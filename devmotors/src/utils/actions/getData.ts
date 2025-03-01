import { redirect } from "next/navigation"

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

export async function getSubMenu() {
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

export async function getItemBySlug(itemSlug: string) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`

  // Definindo o objeto da consulta pelo slug
  const queryParams = new URLSearchParams({
    query: JSON.stringify({
      slug: itemSlug
    }),
    props: 'slug,title,metadata',
    read_key: process.env.READ_KEY as string
  })

  const url = `${baseUrl}?${queryParams.toString()}`

  try {
    const res = await fetch(url, { next: { revalidate: 120 } })
    if (!res.ok) {
      throw new Error("Failed get item by slug")
    }

    return res.json()
  } catch (error) {
    redirect('/')
    // throw new Error("Failed get item by slug")
  }

}