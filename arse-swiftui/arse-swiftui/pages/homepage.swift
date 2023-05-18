//
//  homepage.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/13/23.
//

import SwiftUI


struct deal: View {
    var body: some View {
        VStack {
            AsyncImage(url: URL(string: "https://www.howards.com/uploads/slides/HP%20Promotions%20Gallery/ho422blackfriaprhpbanner1034x266.jpg")) { image in
                image.resizable()
                    .frame(width: 350, height: 200).background(.white).cornerRadius(10)
            } placeholder: {
                Text("loading")
            }
            //
            
        }.frame(width: 350, height: 200).background(.yellow).cornerRadius(10).shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4)
    }
}

struct HotPreview: View {
    var body: some View{
        AsyncImage(url: URL(string: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80")) { image in
            image.resizable()
                .frame(width: 400, height: 250).background(.white).cornerRadius(10)
        } placeholder: {
            Text("loading")
        }.overlay(
            HStack {
                VStack(alignment: .trailing){
                    Text("LG Washing Machine").font(.title2).bold().padding(2)
                    HStack{
                        Text("IN STOCK").bold().foregroundColor(.green)
                        Text("$4423")
                    }
                }.padding(.trailing, 20)
                Image(systemName: "arrow.right.square").resizable().frame(width: 30, height: 30)
                
                
                
            }.frame(width: 400, height: 90).background(.black.opacity(0.6)).foregroundColor(.white).cornerRadius(10).multilineTextAlignment(.center)
                .offset(y:-80)
            
            ).shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4)
    }
}

struct homepage: View {
    @State var navTitle = "Homepage"
    var color: Color = .white
    @State var isButtonOn = true
    func swap() {
        isButtonOn.toggle()
    }
    var body: some View {
        VStack {
            NavBar(title: navTitle)
            ScrollView{
                HotPreview().shadow(color: Color.black.opacity(0.1), radius: 5, x: 0, y: 4).padding(.bottom, 20)
                VStack{
                    HStack(spacing: 15){
                        Button(action: swap) {
                            Text("Browse")
                                            .padding()
                                            .foregroundColor(!isButtonOn ? Color.white : Color.black)
                                            .background(isButtonOn ? Color.yellow : Color.gray)
                                            .cornerRadius(10)
                        }.disabled(isButtonOn)
                        Button(action: swap) {
                            Text("Categorize")
                                            .padding()
                                            .foregroundColor(!isButtonOn ? Color.black : Color.white)
                                            .background(!isButtonOn ? Color.yellow : Color.gray)
                                            .cornerRadius(10)
                        }.disabled(!isButtonOn)
                    }
                }.padding(.bottom, 20)
                if (isButtonOn) {
                    deal().padding(.bottom, 20)
                    browse().frame(height: 2000)
                } else {
                    categorize()
                }
            }.offset(y: -10)
        }
    }
}

struct homepage_Previews: PreviewProvider {
    static var previews: some View {
        homepage()
    }
}
