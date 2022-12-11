import { listUsersController } from "../../../controllers/user/listUsersController";
import { registerController } from "../../../controllers/user/registerController";

export default function handler(req, res) {
  console.log(req.method);

  switch(req.method) {
    case 'GET':
      listUsersController(req, res);
      break;
    case 'POST':
      registerController(req, res);
      break;
  }
}
