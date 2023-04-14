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
        ZStack{
            Color.clear
                .background(Color.white)
                .shadow(color: Color.gray, radius: 50, x: 0, y: -5)
            
            Image(systemName: "dishwasher")
                .font(.system(size: 30))
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 20)
            
            Text(title).font(.system(size: 25))
            
            Button{ showSearch = true } label: {
                Image(systemName: "magnifyingglass.circle").font(.system(size: 30)).frame(maxWidth: .infinity, alignment: .trailing).padding(.trailing, 20)
            }.sheet(isPresented: $showSearch) {
                Search()
            }
                
        }.frame(height: 70)
            .frame(maxHeight: .infinity, alignment: .top)
    }
}

struct NavBar_Previews: PreviewProvider {
    static var previews: some View {
        NavBar(title: "Home")
    }
}
