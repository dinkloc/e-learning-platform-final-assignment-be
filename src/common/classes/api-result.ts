import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export enum ApiStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}

export class ApiResult<T> {
    @ApiProperty()
    public status: ApiStatus = ApiStatus.ERROR;

    @ApiProperty()
    public code: number;

    @ApiProperty()
    public errorCode: string;

    @ApiProperty()
    public message: string;

    @ApiProperty()
    public data: T;

    public success(data?: T, message?: string) {
        this.status = ApiStatus.SUCCESS;
        this.code = HttpStatus.OK;
        if (message) {
            this.message = 'OK';
        }
        this.data = data;

        return this;
    }

    public setMessage(message: string) {
        this.message = message;

        return this;
    }

    public error(message: string, code: number, errorCode?: string) {
        this.status = ApiStatus.ERROR;
        this.errorCode = errorCode;
        this.message = message;
        this.code = code;

        return this;
    }
}