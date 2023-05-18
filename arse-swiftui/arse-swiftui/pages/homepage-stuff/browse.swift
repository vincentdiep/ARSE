//
//  browse.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/12/23.
//



import SwiftUI



struct browse: View {
    
    @StateObject var productListModel = FetchProductListModel(productListURL:
                                                                "/api/products/?populate=*&pagination[page]=1&pagination[pageSize]=1", baseURL: "http://localhost:1337"
                    )
    
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
    
    func GenerateRandNumber() -> Double {
        return Double.random(in: 1000.0..<2000.0);
    }
    
    var body: some View {
        
        VStack {
                    NavigationView {
                        List(productListModel.products, id: \.self) { product in
                            
                            let priceValue = GenerateRandNumber();
                            HStack{
                                NavigationLink(
                                    destination: item_display(product: product, imgURL: ConcatURL(listOfStrings: [productListModel.baseURL, GimmyFirstImage(product: product)]), price: priceValue), label: {
                                        VStack {
                                            AsyncImage(url: ConcatURL(listOfStrings: [productListModel.baseURL, GimmyFirstImage(product: product)]))
                                            { phase in
                                                switch phase {
                                                case .success(let image):
                                                    image.resizable().aspectRatio(contentMode: .fit)
                                                case .failure(_):
                                                    Text("Failed to Load: ").foregroundColor(.red)
                                                case .empty:
                                                    Text("loading......")
                                                @unknown default:
                                                    Text("loading...")
                                                }
                                            }
                                            Text(String(product.attributes.group.data.attributes.name))
                                            .font(.headline)
                                            HStack {
                                                Text("IN STOCK")
                                                Text("$\(String(format: "%.2f", priceValue))")
                                            }
                //                        Text(String(product.attributes.description))
                                        }}).padding()
                                    .frame(maxWidth: .infinity)
                                    .background(Color.white)
                                    .cornerRadius(10)
                                    .shadow(radius: 5)
                            }
                        }.listStyle(PlainListStyle()).listRowInsets(EdgeInsets())
                            .navigationBarTitle(Text("Selected Products").font(.title), displayMode: .inline)
                        .onAppear{
                            productListModel.fetchData()
                            
                        }
                    }.background(.red)
        }
    }
}

struct browse_Previews: PreviewProvider {
    static var previews: some View {
        browse()
    }
}
