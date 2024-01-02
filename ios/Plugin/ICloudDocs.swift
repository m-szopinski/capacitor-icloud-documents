import Foundation

@objc public class ICloudDocs: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
