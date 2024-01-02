#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(ICloudDocsPlugin, "ICloudDocs",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(readFile, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(readFileB64, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeFile, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(writeFile, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fileExist, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(stat, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(readdir, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(mkdir, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(initUbiquitousContainer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(syncToCloud, CAPPluginReturnPromise);
)
