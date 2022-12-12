import { loginController } from "../../../controllers/user/loginController";
import { editUserController } from "../../../controllers/user/editUserController";
import { deleteUserController } from "../../../controllers/user/deleteUserController";
import { findUserController } from "../../../controllers/user/findUserController";

export default function handler(req, res) {
  switch(req.method) {
    case 'GET':
      findUserController(req, res);
      break;
    case 'POST':
      loginController(req, res);
      break;
    case 'PUT':
      editUserController(req, res);
      break;
    case 'DELETE':
      deleteUserController(req, res);
      break;
  }
}
