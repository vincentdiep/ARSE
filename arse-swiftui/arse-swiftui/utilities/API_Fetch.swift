import Foundation


let API_KEY = "dbfec22f11fe4f30964d531c325f0c279782e7fdee83894e8f746e7b89f4b2aca4c1f912c42707057e93a9e3d0a5b9fd694d32e2e6c328ac071072f187358b0046b857d6e48e3dd9f092cfab2d162cdb6525fab7cbeac07c40d9947fcf225ddc36e2c2b952e464cec1affc8cd9c7703833c2ebfed23ac5306b37878cc890f018"




class FetchProductListModel: ObservableObject {
    @Published var products = [Product]()
    var productListURL: String
    var baseURL: String
    init(productListURL: String, baseURL: String) {
        self.productListURL = productListURL
        self.baseURL = baseURL
    }
    func fetchData() {
        guard let url = URL(string: baseURL + productListURL) else {
            return
        }
        var request = URLRequest(url: url)
        request.addValue("application/json",forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer \(API_KEY)", forHTTPHeaderField: "Authorization")

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let data = data {
                do {
                    print("data: ")
                    print(data)
                    let decodedResponse = try JSONDecoder().decode(ProductListData.self, from: data)
                    DispatchQueue.main.async {
                        self.products = decodedResponse.data
                    }
                    return
                } catch {
                    print(error)
                }
            }
        }.resume()
    }
}
