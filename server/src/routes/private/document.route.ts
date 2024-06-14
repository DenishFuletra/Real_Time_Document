import { Router, Request, Response } from 'express';
import DocumentController from '../../controllers/document.controller';
import { loginValidator } from '../../middleware/validator';
import express from 'express';
const router = express.Router();

const document = (router: Router) => {
    router.post('/createDocument', async (req: Request, res: Response) => {
        const documentController = new DocumentController();
        const response = await documentController.createDocument(req.body);
        return res.status(response.status).send(response);
    });

    router.get('/getDocument/:id', async (req: Request, res: Response) => {
        const documentController = new DocumentController();
        const response = await documentController.getDocumentById(req.params.id);
        return res.status(response.status).send(response);
    });

    router.put('/updateDocument', async (req: Request, res: Response) => {
        const documentController = new DocumentController();
        const response = await documentController.updateDocumentById(req.body);
        return res.status(response.status).send(response);
    });

    router.delete('/deleteDocument/:id', async (req: Request, res: Response) => {
        const documentController = new DocumentController();
        const response = await documentController.deleteDocumentById(req.params.id);
        return res.status(response.status).send(response);
    });
};

document(router);
export default router;
