// //
// //  ContentView.swift
// //  arse-swiftui
// //
// //  Created by csuftitan on 3/18/23.
// //

// import SwiftUI
// import RealityKit

// struct ContentView : View {
//     var body: some View {
// //        ARViewContainer().edgesIgnoringSafeArea(.all)
//         text
//     }
// }

// struct ARViewContainer: UIViewRepresentable {
    
//     func makeUIView(context: Context) -> ARView {
        
//         let arView = ARView(frame: .zero)
        
//         // Load the "Box" scene from the "Experience" Reality File
//         let boxAnchor = try! Experience.loadBox()
        
//         // Add the box anchor to the scene
//         arView.scene.anchors.append(boxAnchor)
        
//         return arView
        
//     }
    
//     func updateUIView(_ uiView: ARView, context: Context) {}
    
// }


// yeah just leave the stuff above ig



import SwiftUI




//struct SwapperView: View {
//
//    @State var enableARMode = false
//
//    var body: some View{
//        return Group {
//            if enableARMode {
//                ARView()
//            }
//            else {
//                ContentView(enableARMode: $enableARMode)
//            }
//        }
//    }
//}


struct ContentView: View {
    
    
    
    var body: some View {
        TabView{
            homepage().tabItem {
                Image(systemName: "house")
                Text("Home")
            }
            mappage().tabItem {
                Image(systemName: "location.circle")
                Text("Map")
            }
            arpage().tabItem {
                Image(systemName: "camera.viewfinder")
                Text("AR Mode")
            }
        }.shadow(color: Color.red, radius: 50, x: 0, y: 10)
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//        .overlay(
//
//        )
        
        
        
//        NavigationView() {
//            HStack{
//                NavigationLink(destination: browse(), label: {
//                    Text("Browse")
//                        .padding([.bottom, .top], 15)
//                        .padding([.leading, .trailing], 20)
//                        .background(Color.gray)
//                        .foregroundColor(.white)
//                        .cornerRadius(20)
//                }).simultaneousGesture(TapGesture().onEnded{
//                        self.navTitle = "Browse"
//                    })
//
//                NavigationLink(destination: categorize(), label: {Text("Categorize")}).simultaneousGesture(TapGesture().onEnded{
//                    self.navTitle = "Categorize"
//                })
//            }.navigationTitle(
//                Text(navTitle)
//            )
//
//        }

    }
}



struct ContentView_Previews: PreviewProvider {
    
    static var previews: some View {
        ContentView()
    }
}

