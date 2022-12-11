import { depositController } from "../../../controllers/bank/depositController";

export default function handler(req, res) {
  console.log(req.method);

  switch(req.method) {
    case 'POST':
      depositController(req, res);
      break;
  }
}
