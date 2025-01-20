import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { PassThrough } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class DigitalOceanService {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    const ENV = process.env;
    this.s3 = new S3Client({
      endpoint: ENV.DIGITAL_OCEAN_SPACE_ENDPOINT,
      region: ENV.DIGITAL_OCEAN_SPACE_REGION,
      credentials: {
        accessKeyId: ENV.DIGITAL_OCEAN_ACCESS_KEY_ID,
        secretAccessKey: ENV.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = ENV.DIGITAL_OCEAN_BUCKET_NAME;
  }

  async getSignedUrl(path: string): Promise<{ url: string; size: number }> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: path,
    });

    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 15 * 60 });

    const metadata = await this.s3.send(new HeadObjectCommand({ Bucket: this.bucketName, Key: path }));
    const size = metadata.ContentLength;

    return { url: signedUrl, size: size || 0 };
  }

  async fetchFilesList(folderName: string, continuationToken?: string): Promise<any[]> {
    const params = {
      Bucket: this.bucketName,
      Prefix: folderName,
      ContinuationToken: continuationToken,
    };

    const command = new ListObjectsV2Command(params);
    const data = await this.s3.send(command);
    let allContents = data.Contents || [];

    if (data.IsTruncated && data.NextContinuationToken) {
      const nextContents = await this.fetchFilesList(folderName, data.NextContinuationToken);
      allContents = allContents.concat(nextContents);
    }

    return allContents;
  }

  async uploadFile(file: Buffer, path: string, isPublic: boolean = false): Promise<any> {
    const params: any = {
      Bucket: this.bucketName,
      Key: path,
      Body: file,
      ACL: isPublic ? 'public-read' : 'private',
    };

    const command = new PutObjectCommand(params);
    return this.s3.send(command);
  }

  uploadStream(path: string, isPublic: boolean = false): PassThrough {
    const pass = new PassThrough();

    const params: any = {
      Bucket: this.bucketName,
      Key: path,
      Body: pass,
      ACL: isPublic ? 'public-read' : 'private',
    };

    const command = new PutObjectCommand(params);
    this.s3.send(command).then(
      () => pass.emit('finish'),
      (err) => pass.emit('error', err),
    );

    return pass;
  }

  async deleteFile(path: string): Promise<any> {
    const params = {
      Bucket: this.bucketName,
      Key: path,
    };

    const command = new DeleteObjectCommand(params);
    return this.s3.send(command);
  }
}
