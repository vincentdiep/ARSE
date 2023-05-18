//
//  item_display.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/12/23.
//

import SwiftUI


let BrandsURLS = [
    "JennAir": "https://www.whirlpoolcorp.com/wp-content/uploads/JennAir-Experience-RISE-2019.jpg"
]


struct item_display: View {
    let product: Product
    let imgURL: URL
    let price: Double
    
    var body: some View {
        ScrollView{
            VStack{
                Text(product.attributes.brand.data.attributes.name).font(.title)
                Text(product.attributes.group.data.attributes.name).font(.title2)
            }.frame(width: 400).background(.white).padding(.all, 10)
            HStack{
                //Display SKU
                AsyncImage(url: imgURL){ image in
                    image.resizable()
                        .aspectRatio(contentMode: .fit)
                }placeholder: {
                    Text("loading...")
                }.frame(height: 300) // Set the height to your desired value
                .ignoresSafeArea(.all, edges: .top)
            }
            Text("Model #\(product.attributes.sku)").padding(.bottom, 10)
            VStack {
                Text("$\(String(format: "%.2f", price))").font(.title).bold().padding(.bottom, 10)
                HStack {
                    Text("$\(String(format: "%.2f", price+200))").strikethrough(true, color: .red).foregroundColor(.red).padding(.trailing, 10).font(.title3)
                    Text("Save $200.00").bold().foregroundColor(.green).font(.title3)
                }
            }.frame(width: 250).padding(20).background(.white).cornerRadius(20).shadow(radius: 5).padding(.bottom, 240)
            HStack{
                AsyncImage(url: URL(string: BrandsURLS[product.attributes.brand.data.attributes.name]!)){ image in
                    image.resizable().frame(width: 400, height: 450)
                }placeholder: {
                    Text("loading...")
                }.overlay(
                    VStack {
                        HStack {
                            Text("Get More Info").foregroundColor(.black).font(.title3).bold().padding(10)
                            Image(systemName: "arrow.right.circle").resizable().frame(width:25, height: 25).foregroundColor(.black)
                        }.padding().frame(width: 250, height: 75).background(.white).cornerRadius(20)
                        
                    }.frame(width: 400, height: 450).background(.black.opacity(0.65)).foregroundColor(.white).cornerRadius(10).multilineTextAlignment(.center)
                    
                    ).shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4)
            }.overlay(VStack {
                VStack {
                    Text("Dive into the Details").font(.title).bold().padding(.bottom, 10)
                    Text(product.attributes.description).frame(width: 300).multilineTextAlignment(.center).font(.title3)
                }.padding(10)
                VStack {
                    Text("\(String(product.attributes.dimension.width)) x \(String(product.attributes.dimension.height)) x \(String(product.attributes.dimension.depth))").font(.title).bold().padding(10)
                    Text("W x H x D").font(.title2)
                }
            }.frame(width: 400, height: 300).background(.yellow).cornerRadius(50).position(x: 200, y: -80)
            
)
        }
        Spacer()
    }
}
