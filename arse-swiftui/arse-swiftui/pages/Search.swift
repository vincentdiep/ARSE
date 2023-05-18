//
//  Search.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/13/23.
//

import SwiftUI

struct Search: View {
    @StateObject var productListNameModel = FetchProductListModel(productListURL:
                                                                "/api/products/?populate=*&pagination[page]=1&pagination[pageSize]=1", baseURL: "http://localhost:1337"
                    )
    @State var text = ""
    
    func ConcatURL(listOfStrings: [String]) -> URL {
        var s: String = ""
        for str in listOfStrings {
            s += str
        }
        return URL(string: s)!
    }
    
    func GimmyFirstImage(product: Product) -> String {
        
        guard
            let imageURL = product.attributes.images?.data?[0].attributes?.url as? String
        else { return "/uploads/image_processing20200516_26875_cx3ies_705a5e16b1.png" }
        
        return imageURL
        
        
    }
    
    
    
    var body: some View {
        NavigationView{
            List(productListNameModel.products, id: \.self) { product in
                HStack{
                    NavigationLink(destination: item_display(product: product, imgURL: ConcatURL(listOfStrings: [productListNameModel.baseURL, GimmyFirstImage(product: product)]), price: 1200), label: {
                        HStack {
                            AsyncImage(url: ConcatURL(listOfStrings: [productListNameModel.baseURL, GimmyFirstImage(product: product)]))
                            { phase in
                                switch phase {
                                case .success(let image):
                                    image.resizable().frame(width: 100, height: 100)
                                case .failure(_):
                                    Text("Failed to Load: ").foregroundColor(.red)
                                case .empty:
                                    Text("loading......")
                                @unknown default:
                                    Text("loading...")
                                }
                            }
                            VStack {
                                Text(product.attributes.group.data.attributes.name).bold()
                                Text(product.attributes.sku)
                            }
                        }
                    })
                }
            }
            .navigationTitle(Text("Products"))
            .onAppear{
                productListNameModel.fetchData()
            }
        }
            .searchable(text: $text, placement: .navigationBarDrawer(displayMode: .always), prompt: Text("Explore our appliances"))
            .navigationTitle("Search")
            .navigationBarTitleDisplayMode(.inline)
        }
    }


struct Search_Previews: PreviewProvider {
    static var previews: some View {
        Search()
    }
}
