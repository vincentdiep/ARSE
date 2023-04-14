//
//  item_display.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/12/23.
//

import SwiftUI

struct item_display: View {
    let product: Product
    let imgURL: URL
    
    var body: some View {
        VStack{
            HStack{
                //Display SKU
                AsyncImage(url: imgURL){ image in
                    image.resizable()
                        .aspectRatio(contentMode: .fit)
                }placeholder: {
                    Text("loading...")
                }.frame(height: 500) // Set the height to your desired value
                .ignoresSafeArea(.all, edges: .top)
            }
            VStack(alignment: .leading){
                Text(product.attributes.group.data.attributes.name).font(.title)
                Text(product.attributes.description)
            }.padding(.all, 10)
            VStack(alignment: .leading){
                Text("More Info:").font(.title)
                NavigationLink("AR Mode") {
                    ARCameraView()
                }
            }

        }
        Spacer()
    }
}
