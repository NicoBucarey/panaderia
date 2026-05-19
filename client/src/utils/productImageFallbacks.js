const LOCAL_PRODUCT_EXTENSIONS = ["jpg", "jpeg", "png", "webp"]

function normalizeProductName(name) {
  return String(name || "").trim()
}

export function slugifyProductName(name) {
  return normalizeProductName(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getLocalProductImageCandidates(productName) {
  const normalizedName = normalizeProductName(productName)
  const slug = slugifyProductName(productName)

  if (!normalizedName) {
    return []
  }

  const exactNameCandidates = LOCAL_PRODUCT_EXTENSIONS.map(
    (extension) => `/productos/${encodeURIComponent(normalizedName)}.${extension}`
  )

  const slugCandidates = slug
    ? LOCAL_PRODUCT_EXTENSIONS.map(
        (extension) => `/productos/${slug}.${extension}`
      )
    : []

  return [...new Set([...exactNameCandidates, ...slugCandidates])]
}