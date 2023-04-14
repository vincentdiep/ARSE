//
//  arpage.swift
//  arse-swiftui
//
//  Created by csuftitan on 4/13/23.
//

import SwiftUI

struct arpage: View {
    var body: some View {
        Text("AR Stuff")
    }
}

import ARKit
import RealityKit

struct ARCameraView : UIViewRepresentable {
    func updateUIView(_ uiView: UIViewType, context: Context) {
    }
    
    func makeUIView(context: Context) -> some UIView {
        
        let view = ARView()
        
        let session = view.session
        let config = ARWorldTrackingConfiguration()
        config.planeDetection = [.horizontal]
        session.run(config)
        
        let coachingOverlay = ARCoachingOverlayView()
        coachingOverlay.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        coachingOverlay.session = session
        coachingOverlay.goal = .horizontalPlane
        view.addSubview(coachingOverlay)
        
        #if DEBUG
        view.debugOptions = [.showFeaturePoints, .showAnchorOrigins, .showAnchorGeometry]
        #endif
        
        return view
    }
    
}

struct arpage_Previews: PreviewProvider {
    static var previews: some View {
        arpage()
    }
}
