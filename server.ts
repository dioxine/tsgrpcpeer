import * as fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import { UserServiceService, IUserServiceServer } from './proto/user_grpc_pb';
import { UserRequest, UserResponse } from './proto/user_pb';

const host = 'localhost:50051';
const root_cert = fs.readFileSync('cert/ca/public/ca.crt');
const server_pk = fs.readFileSync('cert/server/private/server.pem');
const server_cert = fs.readFileSync('cert/server/public/server.crt');

const exampleServer: IUserServiceServer = {
  user (
    call: grpc.ServerUnaryCall<UserRequest, UserResponse>,
    callback: grpc.sendUnaryData<UserResponse>
  ) {
    if (call.request) {
      console.log(
        `(server) Got client message: ${call.request.getUser()}`
      );
    }
    const res = new UserResponse();
    res.setMessageResponse('Message from server blabla all is good!');
    callback(null, res);
  }
};

function getServer(): grpc.Server {
  const server = new grpc.Server();
  server.addService(UserServiceService, exampleServer);
  return server;
}

if (require.main === module) {
  const server = getServer();

  server.bindAsync(
    host,
    grpc.ServerCredentials.createSsl(root_cert,[{private_key:server_pk, cert_chain:server_cert}]),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
      }
    }
  );
}
