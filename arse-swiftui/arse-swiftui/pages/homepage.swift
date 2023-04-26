//
//  homepage.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/13/23.
//

import SwiftUI

struct homepage: View {
    @State var navTitle = "Homepage"
    var color: Color = .white
    @State var isButtonOn = true
    
    func swap() {
        isButtonOn.toggle()
    }
    
    var body: some View {
        VStack {
//            NavBar(title: navTitle)
            ScrollView{
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
                }
                if (isButtonOn) {
                    browse().frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    categorize()
                }
            }
        }
    }
}

struct homepage_Previews: PreviewProvider {
    static var previews: some View {
        homepage()
    }
}
