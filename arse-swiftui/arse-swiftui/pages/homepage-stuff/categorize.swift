//
//  categorize.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/12/23.
//

import SwiftUI

struct Appliances: Codable {
    let name: String
    let url: URL
}

let listOfAppliances = [
    Appliances(name: "Stoves", url: URL(string: "https://images.unsplash.com/photo-1623114112815-74a4b9fe505d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")!),
    Appliances(name: "Fridges", url: URL(string: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")!),
    Appliances(name: "Washing Machines", url: URL(string: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80")!),
    Appliances(name: "Sofa", url: URL(string: "https://images.unsplash.com/photo-1623114112815-74a4b9fe505d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")!),
    Appliances(name: "Chair", url: URL(string: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80")!),
    Appliances(name: "Oven", url: URL(string: "https://images.unsplash.com/photo-1596552183299-000ef779e88d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80")!),
    Appliances(name: "Beds", url: URL(string: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80")!)
]

struct Brands: Codable {
    let name: String
    let url: URL
}

let listOfBrands = [
    Brands(name: "Samsung", url: URL(string: "https://www.howards.com/uploads/files/Blog/samsung-appliances/samsung-appliances.jpg")!),
    Brands(name: "Diamond Mattress", url: URL(string: "https://dzrf1tezfwb3j.cloudfront.net/uploads/images/FImages//ScreenShot2022-07-14at4.35.53PM-2022-07-14-20-36-07.png")!),
    Brands(name: "Kitchen Aid", url: URL(string: "https://i.insider.com/5f99d90b69331a0011bc5e6c?width=1200&format=jpeg")!),
    Brands(name: "LG", url: URL(string: "https://www.lgnewsroom.com/wp-content/uploads/2022/01/LG-Upgradable-Appliances-01_Product-Line-up.jpg")!),
    Brands(name: "BOSCH", url: URL(string: "https://pisces.bbystatic.com/image2/BestBuy_US/Gallery/57887_connected_kitchen-123211.jpg")!),
    Brands(name: "Maytag", url: URL(string: "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/maytag/en-us/marketing-content/site-assets/page-content/laundry-clp/images/durability-set.jpg?fit=constrain&fmt=jpg&hei=2200&resMode=sharp2&utc=2021-10-11T17:30:14Z&wid=2200")!)
]


struct ApplianceView: View {
    var body: some View {
        VStack {
            Text("Appliances").font(.title).bold().padding(.bottom, 10)
            Text("Deep dive into our appliances").font(.title2)
        }
        ScrollView(.horizontal) {
            HStack {
                ForEach(listOfAppliances, id: \.name) { appliance in
                    ZStack {
                        
                        AsyncImage(url: appliance.url) { image in
                            image.resizable()
                                .frame(width: 150, height: 200).cornerRadius(10)
                        } placeholder: {
                            Text("loading")
                        }.overlay(Text(appliance.name).frame(width: 150, height: 200).font(.title).bold().background(.black.opacity(0.5)).foregroundColor(.white).cornerRadius(10).multilineTextAlignment(.center))
                    }.frame(width: 150, height: 200).shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4)
                    
                    
                }
            }.padding(10)
        }
    }
}

struct BrandView: View {
    var body: some View {
        VStack {
            VStack {
                Text("Featured Brands").font(.title).bold().padding(.bottom, 10)
                Text("Explore our partnered brands!").font(.title2)
            }
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 1) {
                ForEach(listOfBrands, id: \.name) { brand in
                    ZStack {
                        
                        AsyncImage(url: brand.url) { image in
                            image.resizable()
                                .frame(width: 175, height: 125).background(.white).cornerRadius(10)
                        } placeholder: {
                            Text("loading")
                        }.overlay(
                            HStack {
                                Text(brand.name).font(.title).bold().padding(20)
                                
                            }.frame(width: 175, height: 125).background(.white).foregroundColor(.black).cornerRadius(10).multilineTextAlignment(.center)
                            
                            ).shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4)

                    }.frame(width: 150, height: 150)
                }
            }.padding(10)
            
            HStack{
                Text("View more").padding(.trailing, 10).fontWeight(.medium)
                Image(systemName: "arrowshape.turn.up.right.circle.fill").resizable().frame(width: 25, height: 25)
            }
            .font(.title2).padding(10).padding(.leading, 20).padding(.trailing, 20).background(.white).cornerRadius(10)
        }.frame(width: 400, height: 700).background(.yellow).cornerRadius(50)
    }
}

struct CommitmentView: View {
    var body: some View {
        VStack{
            VStack {
                Text("Our Commitment").font(.title).bold().padding(.bottom, 10)
                Text("We are here for you.").font(.title2)
            }
            HStack{
                Image(systemName: "hands.sparkles").resizable().padding(20).frame(width: 100, height: 100).background(.black).foregroundColor(.yellow).cornerRadius(100).padding(.trailing, 20)
                VStack(alignment: .leading) {
                    Text("Expert Service").font(.title2).bold()
                    Text("Our team of experts are available to assist with all of your needs.").font(.subheadline)
                }
            }.frame(width: 300).padding(.bottom, 40)
            HStack{
                Image(systemName: "cart").resizable().padding(25).frame(width: 100, height: 100).background(.black).foregroundColor(.yellow).cornerRadius(100).padding(.trailing, 20)
                VStack(alignment: .leading) {
                    Text("Easy Shopping").font(.title2).bold()
                    Text("We make it easy to get you what you need.").font(.subheadline)
                }
            }.frame(width: 300).padding(.bottom, 40)
            HStack{
                Image(systemName: "checkmark.shield").resizable().padding(25).frame(width: 100, height: 100).background(.black).foregroundColor(.yellow).cornerRadius(100).padding(.trailing, 20)
                VStack(alignment: .leading) {
                    Text("Protecting You").font(.title2).bold()
                    Text("Shop with confidence with out 60-day price match guarantee.").font(.subheadline)
                }
            }.frame(width: 300)
        }
    }
}

struct categorize: View {
    var body: some View {
            ScrollView {
                ApplianceView()
                Spacer().frame(height: 50)
                BrandView()
                Spacer().frame(height: 50)
                CommitmentView()
        }
    }
}

struct categorize_Previews: PreviewProvider {
    static var previews: some View {
        categorize()
    }
}
