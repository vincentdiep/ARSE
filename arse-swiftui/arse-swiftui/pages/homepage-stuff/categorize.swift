//
//  categorize.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/12/23.
//

import SwiftUI

struct categorize: View {
    var body: some View {
        NavigationView {
            NavigationLink(destination: brands(), label: {Text("category template")})
        }
    }
}

struct categorize_Previews: PreviewProvider {
    static var previews: some View {
        categorize()
    }
}
