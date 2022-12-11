import { withdrawController } from "../../../controllers/bank/withdrawController";

export default function handler(req, res) {
  console.log(req.method);

  switch(req.method) {
    case 'POST':
      withdrawController(req, res);
      break;
  }
}
