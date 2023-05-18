
struct ProductBrand: Hashable, Codable {
    let name: String
    let hero_blurb: String?
}

struct ProductBrandContainer: Hashable, Codable {
    let id: Int
    let attributes: ProductBrand
}

struct ProductBrandData: Hashable, Codable {
    let data: ProductBrandContainer
}

struct ProductGroup: Hashable, Codable {
    let name: String
}

struct ProductGroupContainer: Hashable, Codable {
    let id: Int
    let attributes: ProductGroup
}

struct ProductGroupData: Hashable, Codable {
    let data: ProductGroupContainer
}

struct ProductFeature: Hashable, Codable {
    let name: String
    let description: String
    let main_body: String
}

struct ProductFeatureContainer: Hashable, Codable {
    let id: Int
    let attributes: ProductFeature
}

struct ProductFeaturesData: Hashable, Codable {
    let data: [ProductFeatureContainer]
}

struct ProductDimension: Hashable, Codable {
    let id: Int
    let depth: Double
    let height: Double
    let width: Double
    let weight: Double
    let unit_length: String
    let unit_weight: String
}

struct ProductImageAttributes: Hashable, Codable {
    let url: String?
}

struct ProductImageData: Hashable, Codable {
    let id: Int
    let attributes: ProductImageAttributes?
}

struct ProductImage: Hashable, Codable {
    let data: [ProductImageData]?
}


struct ProductDimensionData: Hashable, Codable {
    let width: Int
    let height: Int
    let depth: Int
}

struct ProductAttributes: Hashable, Codable {
    let sku: String
    let description: String
    let long_description: String
    let brand: ProductBrandData
    let group: ProductGroupData
    let dimension: ProductDimensionData
    let features: ProductFeaturesData
    let images: ProductImage?
}

struct Product: Hashable, Codable {
    let id: Int
    let attributes: ProductAttributes
}

struct ProductListData: Codable {
    let data: [Product]
}

