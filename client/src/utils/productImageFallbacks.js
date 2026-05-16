const LOCAL_PRODUCT_EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

export function slugifyProductName(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getLocalProductImageCandidates(productName) {
  const slug = slugifyProductName(productName)

  if (!slug) {
    return []
  }

  return LOCAL_PRODUCT_EXTENSIONS.map(
    (extension) => `/productos/${slug}.${extension}`
  )
}