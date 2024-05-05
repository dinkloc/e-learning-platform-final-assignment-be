import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common';


@Injectable()
export class S3Service {
    private readonly s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            region: process.env.region,
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        });

    }

    async uploadFile(file) {
        return await this.s3_upload(
            file.buffer,
            "profile-user-image",
            file.originalname,
            file.mimetype,
        );
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'us-east-1',
            },
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }

}