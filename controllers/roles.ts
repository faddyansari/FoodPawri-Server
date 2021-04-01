import * as express from "express";

let router = express.Router();


router.get('/getAllRoles', async (req, res) => {
    try {
    //   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    //   res.header('Expires', '-1');
    //   res.header('Pragma', 'no-cache');
      console.log('Export Tickets');
      res.send('Done!');
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });

export const RolesRoutes: express.Router = router;