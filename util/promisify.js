export function dockerModemFollowProgress(docker, stream) {
  return new Promise((resolve, reject) => {
    docker.modem.followProgress()
  });
}
