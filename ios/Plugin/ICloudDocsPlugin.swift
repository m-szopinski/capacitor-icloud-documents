import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(ICloudDocsPlugin)
public class ICloudDocsPlugin: CAPPlugin {
    private let implementation = ICloudDocs()

    var ubiquitousContainerID: String?
    var ubiquitousContainerURL: URL?

    @objc func readFile(_ call: CAPPluginCall) {
        do {
            if self.ubiquitousContainerURL == nil {
                self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
            }

            let filePath = call.getString("filePath")
            let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
                .appendingPathComponent("Documents")
                .appendingPathComponent(filePath!)
            let fileManager = FileManager.default

            if fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
                let fileStream: String = try String(contentsOf: fileUrlInUbiquitousContainer!, encoding: .utf8)

                call.resolve([
                    "fileStream": fileStream
                ])
            } else {
                call.reject("File not exist: " + fileUrlInUbiquitousContainer!.absoluteString)
            }
        } catch {
            call.reject(error.localizedDescription, nil, error)
        }
    }

    @objc func readFileB64(_ call: CAPPluginCall) {
        do {
            if self.ubiquitousContainerURL == nil {
                self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
            }

            let filePath = call.getString("filePath")
            let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
                .appendingPathComponent("Documents")
                .appendingPathComponent(filePath!)
            let fileManager = FileManager.default

            if fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
                let fileData = try Data.init(contentsOf: fileUrlInUbiquitousContainer!)
                let fileStream: String = fileData.base64EncodedString(options: NSData.Base64EncodingOptions.init(rawValue: 0))

                call.resolve([
                    "fileStream": fileStream
                ])
            } else {
                call.reject("File not exist: " + fileUrlInUbiquitousContainer!.absoluteString)
            }
        } catch {
            call.reject(error.localizedDescription, nil, error)
        }
    }

    @objc func removeFile(_ call: CAPPluginCall) {

        if self.ubiquitousContainerURL == nil {
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
        }

        let filePath = call.getString("filePath")
        let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
            .appendingPathComponent("Documents")
            .appendingPathComponent(filePath!)
        let fileManager = FileManager.default

        if fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
            do {
                try fileManager.removeItem(at: fileUrlInUbiquitousContainer!)
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
            call.resolve([
                "result": "OK",
                "url": fileUrlInUbiquitousContainer!.absoluteString
            ])
        } else {
            call.reject("File not exist: " + fileUrlInUbiquitousContainer!.absoluteString)
        }
    }

    @objc func writeFile(_ call: CAPPluginCall) {

        if self.ubiquitousContainerURL == nil {
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
        }

        let filePath = call.getString("filePath")
        let data = call.getString("data", "")
        let overwrite = call.getBool("overwrite", false)
        let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
            .appendingPathComponent("Documents")
            .appendingPathComponent(filePath!)
        let fileManager = FileManager.default

        if !fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) || overwrite {
            do {
                try data.data(using: .utf8)?.write(to: fileUrlInUbiquitousContainer!)
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
            call.resolve([
                "result": "OK",
                "url": fileUrlInUbiquitousContainer!.absoluteString
            ])
        } else {
            call.reject("File exist: " + fileUrlInUbiquitousContainer!.absoluteString)
        }
    }

    @objc func mkdir(_ call: CAPPluginCall) {

        if self.ubiquitousContainerURL == nil {
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
        }

        let filePath = call.getString("path")
        let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
            .appendingPathComponent("Documents")
            .appendingPathComponent(filePath!)
        let fileManager = FileManager.default

        if !fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
            do {
                try fileManager.createDirectory(atPath: fileUrlInUbiquitousContainer!.path, withIntermediateDirectories: true, attributes: nil)
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
            call.resolve([
                "result": "OK",
                "url": fileUrlInUbiquitousContainer!.absoluteString
            ])
        } else {
            call.reject("File exist: " + fileUrlInUbiquitousContainer!.absoluteString)
        }
    }

    @objc func fileExist(_ call: CAPPluginCall) {

        if self.ubiquitousContainerURL == nil {
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
        }

        let filePath = call.getString("path")
        let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
            .appendingPathComponent("Documents")
            .appendingPathComponent(filePath!)
        let fileManager = FileManager.default

        if fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
            call.resolve([
                "result": true
            ])
        } else {
            call.resolve([
                "result": false
            ])
        }
    }

    @objc func stat(_ call: CAPPluginCall) {

        if self.ubiquitousContainerURL == nil {
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
        }

        let filePath = call.getString("path")
        let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
            .appendingPathComponent("Documents")
            .appendingPathComponent(filePath!)
        let fileManager = FileManager.default

        if fileManager.fileExists(atPath: (fileUrlInUbiquitousContainer!.path)) {
            do {
                let stat = try fileManager.attributesOfItem(atPath: fileUrlInUbiquitousContainer!.path)
                call.resolve([
                    "modificationDate": stat[FileAttributeKey.modificationDate] ?? "",
                    "creationDate": stat[FileAttributeKey.creationDate] ?? "",
                    "type": stat[FileAttributeKey.type] as! String == "NSFileTypeDirectory" ? "Directory" : "File",
                    "size": stat[FileAttributeKey.size] ?? ""
                ])
            } catch {
                call.reject(error.localizedDescription, nil, error)
            }
        } else {
            call.reject("File exist: " + fileUrlInUbiquitousContainer!.absoluteString)
        }
    }

    @objc func readdir(_ call: CAPPluginCall) {
        do {
            if self.ubiquitousContainerURL == nil {
                self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
            }

            let folder = call.getString("path")
            let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
                .appendingPathComponent("Documents")
                .appendingPathComponent(folder!)
            let fileManager = FileManager.default

            let files = try? FileManager.default.contentsOfDirectory(at: (fileUrlInUbiquitousContainer?.absoluteURL)!,
                                                                     includingPropertiesForKeys: [.contentModificationDateKey],
                                                                     options: .skipsHiddenFiles)
            // Sort Files
            var urls: [URL] = []
            for file in files! {
                urls.append(file)
            }
            let arrayFiles = urls.map { url in
                (url.lastPathComponent, (try? url.resourceValues(forKeys: [.contentModificationDateKey]))?.contentModificationDate ?? Date.distantPast)
            }
            .sorted(by: { $0.1 > $1.1 }) // sort descending modification dates
            .map { $0.0 } // extract file names

            call.resolve([
                "result": arrayFiles
            ])
        }
    }

    // initUbiquitousContainer: Checks user is signed into iCloud and initialises the desired ubiquitous container.
    @objc func initUbiquitousContainer(_ call: CAPPluginCall) {

        // If user is not signed into iCloud, return error
        if FileManager.default.ubiquityIdentityToken == nil {
            call.reject("Empty token")
        }

        DispatchQueue.global(qos: .userInitiated).async {
            // Initialise and store the ubiquitous container url
            self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)

            if self.ubiquitousContainerURL != nil {
                NSLog((self.ubiquitousContainerURL?.absoluteString)!)

                call.resolve()
            } else {
                call.reject("Empty container url")
            }
        }
    }

    // syncToCloud: Sends the file at the given local URL to the ubiquitous container for syncing to iCloud.
    @objc func syncToCloud(_ call: CAPPluginCall) {
        // Get the file to sync's url
        let fileURLArg = call.getString("filePath")
        let folder = call.getString("destinationFolder")

        if fileURLArg != nil {
            NSLog(fileURLArg!)

            // Convert fileUrl to URL
            let fileURL = URL.init(string: fileURLArg!)

            DispatchQueue.global(qos: .userInitiated).async {
                // Initialise and store the ubiquitous container url if necessary
                if self.ubiquitousContainerURL == nil {
                    self.ubiquitousContainerURL = self.getUbiquitousContainerURL(self.ubiquitousContainerID)
                }

                // Get the destination URL of the file within the iCloud ubiquitous container
                let fileUrlInUbiquitousContainer = self.ubiquitousContainerURL?
                    .appendingPathComponent("Documents")
                    .appendingPathComponent(folder!)
                    .appendingPathComponent((fileURL?.lastPathComponent)!)

                do {
                    // Tell iOS to move the file to the ubiquitous container and sync to iCloud
                    try FileManager.default.setUbiquitous(
                        true,
                        itemAt: fileURL!,
                        destinationURL: fileUrlInUbiquitousContainer!)

                    call.resolve([
                        "url": fileURL?.absoluteString ?? ""
                    ])

                } catch {
                    call.reject(error.localizedDescription, nil, error)
                }
            }
        } else {
            call.resolve()
        }
    }

    // getUbiquitousContainerURL: Initialises the ubiquitous container at the given container ID (or default if nil) and returns it's local URL.
    private func getUbiquitousContainerURL(_ containerId: String?) -> URL {
        return FileManager.default.url(forUbiquityContainerIdentifier: containerId)!
    }
}
