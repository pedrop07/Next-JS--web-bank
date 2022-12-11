import { transferController } from "../../../controllers/bank/transferController";

export default function handler(req, res) {
  console.log(req.method);

  switch(req.method) {
    case 'POST':
      transferController(req, res);
      break;
  }
}
