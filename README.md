# Datapos - Data Resources

## The 'fileStore' Folder

...

## The 'fileStoreIndex.json' File

...

## The '\_headers' File

...

## The 'index.html' File

...

## The 'singlePixel.png' File

...

## The 'cors.json' File

Set CORS Policy on Firebase Storage Bucket (No-longer publishing to Firebase Storage)

See: https://firebase.google.com/docs/storage/web/download-files#cors_configuration
See: https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin/37765371

gsutil cors set cors.json gs://datapos-v00-dev-alpha.appspot.com

To list: gsutil cors get gs://datapos-v00-dev-alpha.appspot.com
