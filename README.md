# tsgrpcpeer
Simple GRPC server-client written in TypeScript

It uses mTLS encryption, so you need firstly to generate certs.
Edit `cert/sshgen.sh` file and run it. It will prepare all necessary certs and keys.
File `sshrem.sh` is for clearing all certificates, be careful.

After this do `npm install`.
Then compile proto file(s). `npm run build:proto`
Then build *.js files `npm run build`
To start server `npm run start:server`
To start client `npm run start:client`

Good luck!

P.S. If you copy prepared `cert` folder to the [Go version of GRPC server-client](https://github.com/dioxine/gogrpcpeer) and use same `.proto` file,
it will work with Go as server and TypeScript as client or visa-versa.
