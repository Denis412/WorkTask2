import WebSocketApi from "./webScoketApi";

export default async function () {
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");

  const servers = null;
  const socket = new WebSocketApi();

  let localPeerConnection,
    remotePeerConnection = null;

  await navigator.mediaDevices
    .getUserMedia({
      video: {
        height: 360,
        width: 480,
      },
      audio: true,
    })
    .then((stream) => {
      localVideo.srcObject = stream;

      const videoTrack = stream.getVideoTracks()[0];

      localPeerConnection = new RTCPeerConnection(servers);
      localPeerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          socket.send({ event: "LOCAL_CANDIDATE", payload: event.candidate });
        }
      });

      socket.on("REMOTE_CANDIDATE", (candidate) =>
        localPeerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      );

      socket.on("REMOTE_DESCRIPTION", (description) =>
        localPeerConnection.setRemoteDescription(description)
      );

      localPeerConnection.addTrack(videoTrack, stream);

      localPeerConnection.createOffer().then((description) => {
        localPeerConnection.setLocalDescription(description);

        socket.send({ event: "LOCAL_DESCRIPTION", payload: description });
      });
    });

  remotePeerConnection = new RTCPeerConnection(servers);
  socket.on("LOCAL_DESCRIPTION", (description) => {
    remotePeerConnection.setRemoteDescription(description);

    remotePeerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        socket.send({ event: "REMOTE_CANDIDATE", payload: event.candidate });
      }
    });

    socket.on("LOCAL_CANDIDATE", (candidate) => {
      remotePeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    remotePeerConnection.addEventListener("track", (event) => {
      remoteVideo.srcObject = event.streams[0];
    });

    remotePeerConnection.createAnswer().then((description) => {
      remotePeerConnection.setLocalDescription(description);

      socket.send({ event: "REMOTE_DESCRIPTION", payload: description });
    });
  });
}
