import * as fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import { UserServiceClient } from './proto/user_grpc_pb';
import { UserRequest, UserResponse } from './proto/user_pb';
import { User } from './proto/user_pb';

const host = 'localhost:50051';

// const cr =
//     env.TARGET === "production"
//         ? credentials.createSsl()
//         : credentials.createInsecure();

const root_cert = fs.readFileSync('cert/ca/public/ca.crt');
const client_pk = fs.readFileSync('cert/client/private/client.pem');
const client_cert = fs.readFileSync('cert/client/public/client.crt');

const ssl_creds = grpc.credentials.createSsl(root_cert, client_pk, client_cert);

const client = new UserServiceClient(host, ssl_creds);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  } else {
    onClientReady();
  }
});

function onClientReady() {
  doUnaryCall();
  //   doServerStreamingCall();
  //   doClientStreamingCall();
  //   doBidirectionalStreamingCall();
}

const myUser = new User();
myUser.setId(1);
myUser.setFirstName('Viktor');
myUser.setSecondName('Doe');
myUser.setThirdName('Doe');

function doUnaryCall() {
  const req = new UserRequest();
  req.setUser(myUser);

  client.user(
    req,
    (error: grpc.ServiceError | null, serverMessage?: UserResponse) => {
      if (error) {
        console.error(error.message);
      } else if (serverMessage) {
        console.log(
          `(client) Got server message: ${serverMessage.getMessageResponse()}`
        );
      }
    }
  );
}

// function doServerStreamingCall() {
//   const clientMessage = new ClientMessage();
//   clientMessage.setClientMessage('Message from client');
//   const stream = client.serverStreamingCall(clientMessage);
//   stream.on('data', (serverMessage: ServerMessage) => {
//     console.log(
//       `(client) Got server message: ${serverMessage.getServerMessage()}`
//     );
//   });
// }

// function doClientStreamingCall() {
//   const stream = client.clientStreamingCall(
//     (error: grpc.ServiceError | null) => {
//       if (error) {
//         console.error(error.message);
//       }
//     }
//   );
//   const clientMessage = new ClientMessage();
//   clientMessage.setClientMessage('Message from client');
//   stream.write(clientMessage);
// }

// function doBidirectionalStreamingCall() {
//   const stream = client.bidirectionalStreamingCall();

//   // Server stream
//   stream.on('data', (serverMessage: ServerMessage) => {
//     console.log(
//       `(client) Got server message: ${serverMessage.getServerMessage()}`
//     );
//   });

//   // Client stream
//   const clientMessage = new ClientMessage();
//   clientMessage.setClientMessage('Message from client');
//   stream.write(clientMessage);
// }
