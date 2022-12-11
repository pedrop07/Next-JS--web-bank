import { statementController } from "../../../controllers/bank/statementController";

export default function handler(req, res) {
  console.log(req.method);

  switch(req.method) {
    case 'GET':
      statementController(req, res);
      break;
  }
}
