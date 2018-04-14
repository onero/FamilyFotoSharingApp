"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.uploadedFileToStorage = functions.storage.object().onFinalize(event => {
    if (event.name.startsWith('profile-images')) {
        console.log('Something was uploaded', event);
    }
    else {
        console.log('Did you delete the file?');
    }
});
//# sourceMappingURL=index.js.map