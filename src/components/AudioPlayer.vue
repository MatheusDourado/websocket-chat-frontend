<template>
	<audio ref="audio" crossorigin="anonymous"></audio>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../stores/musicStore';

const audio = ref(null);
const store = useStore();

let audioContext;
let analyser;
let dataArray;
let bufferLength;

onMounted(() => {
	// Inicializar o AudioContext
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const source = audioContext.createMediaElementSource(audio.value);
	analyser = audioContext.createAnalyser();
	source.connect(analyser);
	analyser.connect(audioContext.destination);
	analyser.fftSize = 256;
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);
});

// Assistir por mudanças na música atual
watch(
	() => store.currentTrack.audioUrl,
	async (newUrl) => {
		if (newUrl) {
			audio.value.src = newUrl;
			try {
				// Ativar o AudioContext se estiver suspenso
				if (audioContext.state === 'suspended') {
					await audioContext.resume();
				}
				await audio.value.play();
				// Iniciar a animação visual
				store.startVisualization(analyser, dataArray, bufferLength);
			} catch (error) {
				console.error('Erro ao reproduzir áudio:', error);
				alert('Não foi possível reproduzir a faixa selecionada.');
			}
		}
	},
);
</script>

<style scoped>
/* Estilos, se necessário */
</style>
