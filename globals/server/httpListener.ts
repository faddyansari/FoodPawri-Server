//Created By Fahad Ansari
//Date : 3/31/2021

import * as http from "http";

import { Food_Pawri_Core } from "../entryPoint";

//Application Global Constants
import * as Constants from "../config/constants"


class HTTPListener {

  private server!: http.Server;
  constructor() {
  }

  public async InitHTTPMiddleWare(): Promise<http.Server> {
    try { 
      await Food_Pawri_Core.InitApplication();
      return this.server;
    } catch (error) {
      console.log(error);
      console.log('Error in Creating HTTP SERVER... Retrying');
      setTimeout(async () => {
        await Food_Pawri_Core.InitApplication(); 
      }, 0);
      return this.server;
    }
  }

  public StartHttpServer(): http.Server {
    return Food_Pawri_Core.Application.listen(Constants.port, () => {
      console.log(`Running on localhost:${Constants.port}`)
    });

  }

}
export const httpListener = new HTTPListener();