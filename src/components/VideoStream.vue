<template>
  <div class="flex items-center text-center justify-center column">
    <div class="flex justify-end w-100p q-pa-sm">
      <q-icon
        class="text-h5 cur-pointer text-negative"
        name="close"
        @click="toggleShowVideoTrack"
      />
    </div>

    <div class="bg-grey-3">
      <q-btn flat @click="startWebcam">Включить камеру</q-btn>
      <q-btn flat @click="createCall">Создать новый видеочат</q-btn>
      <q-btn flat @click="answerCall">Присоединиться к звонку</q-btn>
    </div>

    <div class="flex justify-around w-100p">
      <span>
        <h6 class="q-ma-md">Ваша камера</h6>

        <video
          class="video-container bg-grey-5 rounded-borders"
          :srcObject.prop="localStream"
          autoplay
          playsinline
        />
      </span>

      <span>
        <h6 class="q-ma-md">Камера собеседника</h6>

        <video
          class="video-container bg-grey-5 rounded-borders"
          :srcObject.prop="remoteStream"
          autoplay
          playsinline
        />
      </span>
    </div>

    <q-btn flat class="q-mb-sm" color="negative" @click="hangup"
      >Отключиться</q-btn
    >
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
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

const toggleShowVideoTrack = inject("toggleShowVideoTrack");

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
  } catch (error) {
    console.log(error);
  }

  //store.commit("chat/CHANGE_CALL", callDoc.id);

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
      if (change.type === "added") {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

const hangup = async () => {
  store.commit("chat/CHANGE_CALL_ID_IN_CHAT", null);

  // localStream.value = navigator.mediaDevices.getUserMedia({});

  localStream.value.getVideoTracks()[0].enabled = false;
  // Отключение звука
  localStream.value.getAudioTracks()[0].enabled = false;

  pc.close();
};
</script>

<style scoped>
.video-container {
  width: 250px;
  height: 187px;
}

@media (max-width: 320px) {
  .video-container {
    width: 187px;
    height: 140px;
  }
}
</style>
