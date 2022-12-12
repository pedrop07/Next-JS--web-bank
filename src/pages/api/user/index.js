import { listUsersController } from "../../../controllers/user/listUsersController";
import { registerController } from "../../../controllers/user/registerController";

export default function handler(req, res) {
  switch(req.method) {
    case 'GET':
      listUsersController(req, res);
      break;
    case 'POST':
      registerController(req, res);
      break;
  }
}
