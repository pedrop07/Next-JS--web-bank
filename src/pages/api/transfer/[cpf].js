import { transferController } from "../../../controllers/bank/transferController";

export default function handler(req, res) {
  switch(req.method) {
    case 'POST':
      transferController(req, res);
      break;
  }
}
