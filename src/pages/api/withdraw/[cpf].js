import { withdrawController } from "../../../controllers/bank/withdrawController";

export default function handler(req, res) {
  switch(req.method) {
    case 'POST':
      withdrawController(req, res);
      break;
  }
}
