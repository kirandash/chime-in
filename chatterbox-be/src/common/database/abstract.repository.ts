import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

// AbstractRepository class is used to define a base class for all Mongoose repositories ex: UserRepository.
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  // protected property is a class member that can be accessed by the class itself and its subclasses.
  protected abstract readonly logger: Logger;
  // model is used to define a Mongoose model.
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    // .save() method is used to save a document to the database.
    // .toJSON() method is used to convert a Mongoose document to a JSON object.
    // as unknown as TDocument is used to cast the JSON object to the TDocument type.
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    // { lean: true } option is used to return a plain JavaScript object rather than a Mongoose document.
    // {} is used to define the projection. In this case, we are not using any projection. A projection is used to select only the necessary fields from the document.
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery: %o', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document as unknown as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: Partial<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      // lean option is used to return a plain JavaScript object rather than a Mongoose document
      lean: true,
      // new option is used to return the modified document rather than the original
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery: %o', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document as unknown as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(
      filterQuery,
      // {} is used to define the projection. In this case, we are not using any projection. A projection is used to select only the necessary fields from the document.
      {},
      // { lean: true } option is used to return a plain JavaScript object rather than a Mongoose document.
      { lean: true },
    ) as unknown as TDocument[];
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery, {
      lean: true,
    }) as unknown as TDocument;
  }
}
