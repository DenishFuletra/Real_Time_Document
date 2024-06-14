import { httpStatus, getErrorResponse, getResponse } from '../utility/response';
import { ResponseMessages } from '../utility/response.message';
import { DocumentModel } from '../utility/models/index.model';
import Document from '../schema/document.schema';

export default class DocumentController {
    createDocument = async (data: DocumentModel): Promise<any> => {
        try {
            const { title, content } = data;
            const document = await Document.create({ title, content, lastModified: Date.now() });
            if (document) {
                return getResponse(httpStatus.OK, document, ResponseMessages.Document_Created);
            } else {
                return getResponse(httpStatus.NOT_FOUND, false, ResponseMessages.Document_Not_Exist);
            }
        } catch (error) {
            console.error('Error during creating document:', error);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    getDocumentById = async (id: string): Promise<any> => {
        try {
            const document = await Document.findById(id);
            if (document) {
                return getResponse(httpStatus.OK, document, ResponseMessages.Document_Found);
            } else {
                return getResponse(httpStatus.NOT_FOUND, false, ResponseMessages.Document_Not_Exist);
            }
        } catch (error) {
            console.error('Error during finding document:', error);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    updateDocumentById = async (data: DocumentModel): Promise<any> => {
        try {
            const { content, id } = data;
            const document = await Document.findByIdAndUpdate(id, { content, lastModified: Date.now() }, { new: true });
            if (document) {
                return getResponse(httpStatus.OK, document, ResponseMessages.Document_Updated);
            } else {
                return getResponse(httpStatus.CONFLICT, false, ResponseMessages.ServerError);
            }
        } catch (error) {
            console.error('Error during updaing document:', error);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };

    deleteDocumentById = async (id: string): Promise<any> => {
        try {
            const document = await Document.findByIdAndDelete(id);
            if (document) {
                return getResponse(httpStatus.OK, true, ResponseMessages.Document_Deleted);
            } else {
                return getResponse(httpStatus.CONFLICT, false, ResponseMessages.ServerError);
            }
        } catch (error) {
            console.error('Error during updaing document:', error);
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, ResponseMessages.ServerError);
        }
    };
}
