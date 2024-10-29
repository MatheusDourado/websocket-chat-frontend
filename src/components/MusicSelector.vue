<template>
	<div class="relative">
		<!-- Input de Busca -->
		<div class="relative mb-1">
			<input type="text" v-model="searchQuery" placeholder="Buscar música..."
				class="w-full p-2 rounded pr-10 outline-none bg-gray-700 text-gray-200 placeholder-gray-400"
				@keyup.enter="searchTracks" />

			<!-- Ícone de Limpar -->
			<button v-if="searchQuery && tracks.length > 0" @click="clearSearch"
				class="absolute inset-y-0 right-2 flex items-center">
				<TrashIcon class="h-5 w-5 text-gray-400 hover:text-red-400" />
			</button>

			<!-- Ícone de Pesquisar -->
			<button v-else @click="searchTracks" class="absolute inset-y-0 right-2 flex items-center">
				<MagnifyingGlassIcon class="h-5 w-5 text-gray-400 hover:text-green-500" />
			</button>
		</div>

		<!-- Lista de Resultados da Busca (Dropdown Flutuante) -->
		<div v-if="tracks.length > 0" id="musics"
			class="absolute overflow-x-hidden w-full bg-gray-700 rounded shadow-lg z-10 max-h-60 overflow-y-auto custom-scrollbar">
			<ul>
				<li v-for="track in tracks" :key="track.id" @click="selectTrack(track)"
					class="p-2 hover:bg-gray-700 cursor-pointer text-gray-300 flex items-center">
					<div class="flex-1">
						<div class="font-semibold">{{ track.name }}</div>
						<div class="text-sm text-gray-400">{{ track.artist_name }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>


<script setup>
	import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/24/solid';
	import { ref } from 'vue';
	import { useStore } from '../stores/musicStore';

	const searchQuery = ref('');
	const tracks = ref([]);
	const store = useStore();

	async function searchTracks() {
		if (!searchQuery.value.trim()) {
			alert('Por favor, insira um termo de busca.');
			return;
		}
		const results = await store.searchTracks(searchQuery.value);
		tracks.value = results;
	}

	function selectTrack(track) {
		store.setCurrentTrack(track);
		clearSearch();
	}

	function clearSearch() {
		searchQuery.value = '';
		tracks.value = [];
	}
</script>

<style scoped>
	.music-selector {
		overflow: visible;
	}

	#musics::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	#musics::-webkit-scrollbar-track {
		background: #2d2d2d00;
	}

	#musics::-webkit-scrollbar-thumb {
		background-color: #6a6a6a;
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	#musics::-webkit-scrollbar-thumb:hover {
		background-color: #969696;
	}

	#musics::-webkit-scrollbar-button {
		display: none;
	}
</style>