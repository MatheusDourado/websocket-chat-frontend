import axios from 'axios';
import { defineStore } from 'pinia';

export const useStore = defineStore('musicStore', {
	state: () => ({
		CLIENT_ID: '7c55418e', // Substitua pelo seu Client ID
		currentTrack: {
			title: '',
			artist: '',
			year: '',
			image: '',
			audioUrl: '',
		},
	}),
	actions: {
		async searchTracks(query) {
			try {
				const response = await axios.get(
					`https://api.jamendo.com/v3.0/tracks/?client_id=${
						this.CLIENT_ID
					}&format=json&limit=10&namesearch=${encodeURIComponent(
						query,
					)}&include=musicinfo`,
				);
				return response.data.results;
			} catch (error) {
				console.error('Erro:', error);
				alert(
					'Não foi possível buscar as faixas. Verifique o console para mais detalhes.',
				);
				return [];
			}
		},
		setCurrentTrack(track) {
			this.currentTrack.title = track.name;
			this.currentTrack.artist = track.artist_name;
			this.currentTrack.year = track.release_date
				? track.release_date.split('-')[0]
				: 'Ano Desconhecido';
			this.currentTrack.image =
				track.image || 'https://via.placeholder.com/300';
			this.currentTrack.audioUrl = track.audio;
		},
		startVisualization(analyser, dataArray, bufferLength) {
			const animate = () => {
				if (!this.currentTrack.audioUrl) return;
				requestAnimationFrame(animate);
				analyser.getByteFrequencyData(dataArray);
				let sum = 0;
				for (let i = 0; i < bufferLength; i++) {
					sum += dataArray[i];
				}
				const average = sum / bufferLength;
				const scale = average / 128;
				this.updateVisualization(scale);
			};
			animate();
		},
		updateVisualization(scale) {
			// Esta ação será escutada pelo componente MusicCircle
			// Passamos o valor de scale como argumento
		},
	},
});
