// GENERATED CODE -- DO NOT EDIT!

// package: grpcpeer
// file: proto/user.proto

import * as proto_user_pb from "../proto/user_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  user: grpc.MethodDefinition<proto_user_pb.UserRequest, proto_user_pb.UserResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  user: grpc.handleUnaryCall<proto_user_pb.UserRequest, proto_user_pb.UserResponse>;
}

export class UserServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  user(argument: proto_user_pb.UserRequest, callback: grpc.requestCallback<proto_user_pb.UserResponse>): grpc.ClientUnaryCall;
  user(argument: proto_user_pb.UserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_user_pb.UserResponse>): grpc.ClientUnaryCall;
  user(argument: proto_user_pb.UserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_user_pb.UserResponse>): grpc.ClientUnaryCall;
}
