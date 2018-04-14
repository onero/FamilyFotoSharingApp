import * as functions from 'firebase-functions';

exports.uploadedFileToStorage = functions.storage.object().onFinalize(event => {
  if (event.name.startsWith('profile-images')) {
    console.log('Something was uploaded', event);
  } else {
    console.log('Did you delete the file?');
  }
});
