//Using es6 instead of import = require
//Dependencies
import express, {
    Application,
    Request,
    Response,
    NextFunction,
    Router
} from 'express';
import IError from './interfaces/Error';
import path from 'path';
import morgan from 'morgan';
import bodyParser, {
    OptionsJson
} from 'body-parser';

//Import controllers
import customerController from './routes/customerController';
import authController from './routes/authController';
import productController from './routes/productController';
import categoryController from './routes/categoryController';
import attributeController from './routes/attributeController';
import departmentController from './routes/departmentController';

class App {

    //Express app instance
    public app: Application;

    //Private dependency config
    private parserConfig: OptionsJson = {
        limit: '500kb'
    };

    constructor() {

        //Initialize app instancce
        this.app = express();
        //Set port
        this.app.set('PORT', process.env.PORT || 7000);
        this.app.set('LIMIT', 20);
        //Disable powered by
        this.app.disable('x-powered-by');
        //Add routes
        this.api();

    }
   

    private api() {

        //Add cors
        this.app.use((request: Request, response: Response, next: NextFunction) => {

            response.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization'
            });

            next();

        });

        //Only in development
        if (process.env.NODE_ENV === 'development') {

            this.app.use(morgan('dev'));

        }

        //Body-parser
        this.app.use(bodyParser.json(this.parserConfig));

        //Add router
        this.addRouter('/api', customerController);
        this.addRouter('/api', authController);
        this.addRouter('/api', productController);
        this.addRouter('/api', categoryController);
        this.addRouter('/api', attributeController);
        this.addRouter('/api', departmentController);

        //Serving front-end
        if(process.env.NODE_ENV === 'development') {

            this.app.use('/api/images', express.static(path.join(__dirname, '../' ,'/images')));
            
            this.app.use('/', express.static(path.join(__dirname, '../', '../', '/client', '/dist')));

            this.app.use((request:Request, response: Response, next: NextFunction) => {

                response.sendFile(path.join(__dirname, '../', '../', '/client', '/dist', 'index.html'));

            });

        }

        //Error handler
        this.app.use((error: IError, request: Request, response: Response, next: NextFunction) => {

            console.error(error);

            const status = error.status || 500;

            response
                .status(status)
                .json({
                    status,
                    message: error.message,
                    code: error.code,
                    field: error.field || null
                });
        });
    }

    private addRouter(path:string, router: Router) {
        this.app.use(path, router);
    }

}

export default new App().app;

