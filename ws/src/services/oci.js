const common = require("oci-common");
const objectstorage = require("oci-objectstorage");
const OCI_BUCKET_NAMESPACE = process.env.OCI_BUCKET_NAMESPACE;
const OCI_BUCKET_NAME = process.env.OCI_BUCKET_NAME;

module.exports = {
  NAMESPACE: OCI_BUCKET_NAMESPACE,      // ex: axaxaxaxax
  BUCKET_NAME: OCI_BUCKET_NAME,    // nome do bucket

  /**
   * Upload de arquivo
   */
  uploadObject: async function (file, filename) {
    try {
      const provider = new common.ConfigFileAuthenticationDetailsProvider();

      const client = new objectstorage.ObjectStorageClient({
        authenticationDetailsProvider: provider,
      });

      const putObjectRequest = {
        namespaceName: this.NAMESPACE,
        bucketName: this.BUCKET_NAME,
        objectName: filename,
        putObjectBody: file.data,
        contentLength: file.data.length,
      };

      const response = await client.putObject(putObjectRequest);

      return {
        error: false,
        message: {
          etag: response.etag,
          objectName: filename,
        },
      };
    } catch (err) {
      console.error(err);
      return { error: true, message: err };
    }
  },

  /**
   * Delete de arquivo (equivalente ao S3.deleteObject)
   */
  deleteObject: async function (key) {
    try {
      const provider = new common.ConfigFileAuthenticationDetailsProvider();

      const client = new objectstorage.ObjectStorageClient({
        authenticationDetailsProvider: provider,
      });

      const deleteObjectRequest = {
        namespaceName: this.NAMESPACE,
        bucketName: this.BUCKET_NAME,
        objectName: key,
      };

      const response = await client.deleteObject(deleteObjectRequest);

      return {
        error: false,
        message: response,
      };
    } catch (err) {
      console.error(err);
      return { error: true, message: err };
    }
  },
};
