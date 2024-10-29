<script setup>
	import { computed, onMounted, ref } from 'vue';
	import { useStore } from '../stores/musicStore';

	const isHovered = ref(false);
	const store = useStore();

	// Computed properties para obter dados do store
	const songTitle = computed(
		() => store.currentTrack.title || 'Título da Música',
	);
	const artistName = computed(() => store.currentTrack.artist || 'Artista');
	const songYear = computed(() => store.currentTrack.year || 'Ano');

	// Reatividade para o efeito visual
	const musicCircle = ref(null);

	onMounted(() => {
		store.$onAction(({ name, args }) => {
			if (name === 'updateVisualization') {
				const scale = args[0];
				musicCircle.value.style.transform = `scale(${1 + scale * 0.3})`;
			}
		});
	});

	const backgroundImage = computed(() => store.currentTrack.image || 'https://via.placeholder.com/300')
</script>

<template>
	<div
		ref="musicCircle"
		class="music-circle relative"
		:style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
	>
		<div
			class="overlay absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 transition-opacity duration-300"
			:class="{ 'opacity-100': isHovered }"
			@mouseover="isHovered = true"
			@mouseleave="isHovered = false"
		>
			<h2 class="text-gray-200 font-bold uppercase">{{ songTitle }}</h2>
			<h3 class="text-gray-200">{{ artistName }}</h3>
			<p class="text-gray-200">{{ songYear }}</p>
		</div>
	</div>
</template>

<style scoped>
	.music-circle {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background-size: cover;
		background-position: center;
		border: 10px solid #ffffff;
		transition: transform 0.1s ease;
		overflow: hidden;

		@apply w-72 h-72 md:w-80 md:h-80 rounded-full bg-center bg-cover border-2 border-white transition-transform duration-100 overflow-hidden;
	}

	.overlay {
		background-color: rgba(0, 0, 0, 0.7);
		
		border-radius: 50%;
	}

	@media (max-width: 600px) {
		.music-circle {
			width: 200px;
			height: 200px;
		}
	}
</style>
