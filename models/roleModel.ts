import { Db, Collection, ObjectID, ObjectId, FindAndModifyWriteOpResultObject, UpdateWriteOpResult, Decimal128 } from "mongodb";

export class Roles {
    static db: Db;
    static collection: Collection;
    static initialized = false;

    public static async Initialize(): Promise<boolean> {

        try {
        //   this.db = await TicketsDB.connect();
          this.collection = await this.db.createCollection('roles');
          Roles.initialized = true;
          return Roles.initialized;
        } catch (error) {
          console.log(error);
    
          console.log('error in Initializing Role Model');
          throw new Error(error);
        }
        // Database Connection For Visitors Based Operation on Visitor Collections
    
    
      }
      static Destroy() {
        (this.db as any) = undefined;
        (this.collection as any) = undefined;
      }

      public static async getTicketByID(nsp: any, tid: any) {
        try {
          if (tid[0]) {
            return await this.collection.find({ _id: new ObjectId(tid[0].toString()), nsp: nsp }).limit(1).toArray()
          } else {
            return [];
          }
        } catch (error) {
          console.log('Error in getting roles');
          console.log(error);
          return [];
        }
      }


}