<template>
  <div class="flex items-center text-center justify-center column">
    <div>
      <div class="flex">
        <q-btn flat @click="startWebcam">Включить камеру</q-btn>

        <q-btn flat @click="createCall">Создать новый видеочат</q-btn>
        <q-btn flat @click="answerCall">Присоединиться к звонку</q-btn>

        <q-btn flat color="negative" @click="hangup">Отключиться</q-btn>
      </div>
      <span>
        <h3>Ваша камера</h3>
        <video
          class="rounded-borders"
          :srcObject.prop="localStream"
          autoplay
          playsinline
        ></video>
      </span>

      <span>
        <h3>Камера собеседника</h3>
        <video
          class="rounded-borders"
          :srcObject.prop="remoteStream"
          autoplay
          playsinline
        ></video>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
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
import { useMutation } from "@vue/apollo-composable";
import { createCallInChat } from "src/graphql-operations/mutations";

const currentChat = computed(() => store.getters["chat/GET_CURRENT_CHAT"]);

const { mutate: creatingCall } = useMutation(createCallInChat);

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const store = useStore();

const pc = new RTCPeerConnection(servers);
const localStream = ref(null);
const remoteStream = ref(null);

const startWebcam = async () => {
  localStream.value = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  remoteStream.value = new MediaStream();

  localStream.value.getTracks().forEach((track) => {
    pc.addTrack(track, localStream.value);
  });

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.value.addTrack(track);
    });
  };
};

const createCall = async () => {
  const callDoc = doc(collection(db, "calls"));
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");

  store.commit("chat/CHANGE_CALL_ID_IN_CHAT", callDoc.id);

  try {
    const { data } = await creatingCall({
      id: currentChat.value.id,
      call_id: callDoc.id,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }

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
};

const answerCall = async () => {
  const callId = store.getters["chat/GET_CURRENT_CHAT"].call_id;

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

const hangup = () => {
  store.commit("chat/CHANGE_CALL", null);

  pc.close();
};
</script>
