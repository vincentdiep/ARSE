//
//  NavBar.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/13/23.
//

import SwiftUI

struct NavBar: View {
    @State var title = ""
    @State var showSearch = false;
    
    var body: some View {
        HStack{
//            Color.clear
//                .background(Color.white)
//                .shadow(color: Color.gray, radius: 10, x: 0, y: -5)
//
            Text(title).font(.system(size: 25)).padding(.leading, 20).padding(.trailing, 10)
            
            HStack{
                Text("Search").padding(15).foregroundColor(.gray).font(.system(size: 20))
                Button{ showSearch = true } label: {
                    Image(systemName: "magnifyingglass.circle").font(.system(size: 30)).frame(maxWidth: .infinity, alignment: .trailing).padding(.trailing, 20).foregroundColor(.gray)
                }.sheet(isPresented: $showSearch) {
                    Search()
                }
            }.cornerRadius(20).overlay( /// apply a rounded border
                RoundedRectangle(cornerRadius: 100)
                    .stroke(.black, lineWidth: 2)
            ).padding(.trailing, 20)
            
                
        }.frame(height: 90).background(.white).shadow(color: Color.black.opacity(0.2), radius: 5, x: 0, y: 4)
    }
}

struct NavBar_Previews: PreviewProvider {
    static var previews: some View {
        NavBar(title: "Homepage")
    }
}
