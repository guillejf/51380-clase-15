//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import { connect } from 'mongoose';
export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      'mongodb+srv://guillermofergnani:1RW65A7n2ZPPEMWQ@51380.yhqtnxt.mongodb.net/ecommerce?retryWrites=true&w=majority'
    );
    console.log('plug to mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

//----------------SOCKET------------------------------
import { Server } from 'socket.io';
import { MsgModel } from './DAO/models/msgs.model.js';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}
