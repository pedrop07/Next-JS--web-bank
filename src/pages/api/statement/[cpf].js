import { statementController } from "../../../controllers/bank/statementController";

export default function handler(req, res) {
  switch(req.method) {
    case 'GET':
      statementController(req, res);
      break;
  }
}
