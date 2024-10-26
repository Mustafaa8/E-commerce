import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!ObjectId.isValid(value)){
      throw new HttpException("Can't be parsed into ObjectId",HttpStatus.BAD_REQUEST)
    }
    return new ObjectId(value);
  }
}
