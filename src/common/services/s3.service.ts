import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common';


@Injectable()
export class S3Service {
    private readonly s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            region: "us-east-1",
            accessKeyId: "AKIA6GBMH4ZBGY7UFJ2X",
            secretAccessKey: "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",
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