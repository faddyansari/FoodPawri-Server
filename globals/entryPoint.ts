// Created By Fahad Ansari
// Dated : 3/31/2021

import express from "express";

import * as bodyParser from "body-parser";

import * as Routes from "./config/routes";


import * as Constants from "./config/constants"

import { Db } from "mongodb";
import { Roles } from "../models/roleModel";

const cors = require('cors');
import helmet from "helmet";
const compression = require('compression');


class FoodPawriEntryPoint {
    //Static Initialization
  
    private static Instance: FoodPawriEntryPoint;
    public ConcurrentChatLimit = 20;
  
    private application;
  
  
    private constructor() {
      this.application = express();
      //Set Port
      this.application.set('port', Constants.port);
    }
  
    public static GetInstance(): FoodPawriEntryPoint {
      if (!FoodPawriEntryPoint.Instance) {
        FoodPawriEntryPoint.Instance = new FoodPawriEntryPoint();
        return FoodPawriEntryPoint.Instance
      } else {
        return FoodPawriEntryPoint.Instance;
      }
    }
  
    public async InitApplication(): Promise<any> {
      try {
  
  
        console.log('Environment: ' + process);
        console.log('DB Address: ' + process.env.DB_ADDRESS);
        // console.log((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'not Db Address' : '!production');
  
        let databaseToConnect:Db = undefined;
        // await ArchivingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://reportdb.beelinks.solutions:27017/' : undefined);
        //Creating Single Database Connection And Pooling Connection to Rest of The Application;
        // let archiveDbase: Db = await ArchivingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://reportdb.beelinks.solutions:27017/' : undefined);
        // // let agentsDB: Db = await AgentsDB.connect('mongodb://agentsdb.beelinks.solutions:27017/');
        // let ticketsDB: Db = await TicketsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb://ticketsdb.beelinks.solutions:27017/' : undefined);
  
        // let chatsDB: Db = await ChatsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
        // let dbase: Db = await DataBaseConfig.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
        // let agentsDB: Db = await AgentsDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
        // let marketingDB: Db = await MarketingDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined);
        // let companiesDB: Db = await CompaniesDB.connect((process.env.NODE_ENV == 'production') ? (process.env.DB_ADDRESS) ? process.env.DB_ADDRESS : 'mongodb+srv://admin:mufak123.@acms-databases.d703n.mongodb.net/?retryWrites=true&w=majority' : undefined)
  
        console.log('Request Handler Connecting Database First Instance');
        
        if (databaseToConnect) {
          await this.InitCollections();
        } else {
          throw new Error('Error connecting database')
        }
        
        this.RegisterMiddleWare();
  
        return this.application;
  
      } catch (error) {
        //console.log(error);
        console.log('Error in Initializing Application');
        //server.close();
        throw new Error(error);
      }
    }
  
  
    private RegisterMiddleWare() {
  
      this.application.use((req, res, next) => {
        if (req.get('x-amz-sns-message-type')) {
          req.headers['content-type'] = 'application/json';
        }
        next();
      });
  
      // Parse url query string as json
      this.application.use(bodyParser.json());
      //application.use(cors());
  
      // Extended property allows to have embedded object in query string URI.
      // See Following Reference
      //https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
      this.application.use(bodyParser.urlencoded({
        extended: true
      }));
  
      // Middle Ware Handler To hand Cross Origin Angular Requests;
      //In Both The Cases They Request Files but they Don't need To Generate Session On Fetch
      this.application.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
          if (req.headers.origin) {
            res.header("Access-Control-Allow-Origin", (req.headers.origin as string));
            res.header("Access-Control-Allow-Headers", "content-type,Authorization");
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Connection', 'keep-alive');
            res.header('Content-Length', '0');
            res.header('Date', new Date().toISOString());
            res.header('Vary', 'Origin, Access-Control-Request-Headers');
          }
          res.status(204);
          res.end();
        }
        else {
          //       console.log('Called Server');
          next();
        }
      });
  
      this.application.use(compression());
      this.application.use(cors({ credentials: true, origin: "*" }));
      this.application.use(helmet());
      this.application.use('/api/roles', Routes.RolesRoutes);
      
  
      this.application.get('*', function (req, res) {
        res.status(401).send('no routes matches');
      });
  
  
    }
  
    public async InitCollections(reconnect = false): Promise<boolean> {

        //Initializes Models
      try {
        await Roles.Initialize();
        return true;
      } catch (error) {
        console.log('Error in InitCollections');
        throw new Error(error);
      }
    }
  
    public get Application() {
      return this.application;
    }
  
    public destroyCollections() {
      try {
        Roles.Destroy();
      } catch (err) {
        console.log(err);
        console.log('Error in destroying collections');
  
      }
    }
  }


export const Food_Pawri_Core = FoodPawriEntryPoint.GetInstance();

Object.seal(FoodPawriEntryPoint);