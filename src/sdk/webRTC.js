import {
  collection,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  onSnapshot,
  getDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

import { useStore } from "vuex";

export default function () {
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const store = useStore();

  const pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  const webcamButton = document.getElementById("webcamButton");
  const webcamVideo = document.getElementById("webcamVideo");
  const callButton = document.getElementById("callButton");
  const callInput = document.getElementById("callInput");
  const answerButton = document.getElementById("answerButton");
  const remoteVideo = document.getElementById("remoteVideo");
  const hangupButton = document.getElementById("hangupButton");

  webcamButton.onclick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;

    callButton.disabled = false;
    answerButton.disabled = false;
    webcamButton.disabled = true;
  };

  callButton.onclick = async () => {
    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    callInput.value = callDoc.id;

    store.commit("chat/CHANGE_CALL", callDoc.id);

    pc.onicecandidate = async (event) => {
      event.candidate &&
        (await addDoc(offerCandidates, event.candidate.toJSON()));
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    hangupButton.disabled = false;
  };

  answerButton.onclick = async () => {
    const callId = callInput.value;
    const callDoc = doc(collection(db, "calls"), callId);
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    pc.onicecandidate = async (event) => {
      event.candidate &&
        (await addDoc(answerCandidates, event.candidate.toJSON()));
    };

    const callData = (await getDoc(callDoc)).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  hangupButton.onclick = () => {
    store.commit("chat/CHANGE_CALL", null);
  };
}
