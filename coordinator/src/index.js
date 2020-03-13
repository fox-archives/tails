import { GrpcServer } from './core/grpc'
import {
  showProject
} from './actions/project'


GrpcServer.create({
  showProject
})
// function main() {
//   let server = new grpc.Server()
//   server.addService(mainProto.Project.service, {
//     showProject
//   })
//   server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure())
//   server.start()
// }

// main()
