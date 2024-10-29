<template>
	<div class="">
		<div class="flex flex-col md:flex-row h-screen">
			<main
				class="radio-container flex-1 flex items-center justify-center"
			>
				<!-- Componente do Music Circle -->
				<MusicCircle />
				<!-- Componente do Audio Player -->
				<AudioPlayer />
			</main>
			<aside
				class="music-selector w-full md:w-1/3 bg-gray-800 flex flex-col"
			>
				<!-- Componente do Music Selector -->
				<div class="h-full p-4 flex flex-col justify-between">
					<MusicSelector />
					<Messages />
					<MessageSend />
				</div>
			</aside>
		</div>
	</div>
</template>

<script setup>
	import AudioPlayer from './components/AudioPlayer.vue';
	import Messages from './components/Messages.vue';
	import MessageSend from './components/SendMessage.vue';
	import MusicCircle from './components/MusicCircle.vue';
	import MusicSelector from './components/MusicSelector.vue';
</script>
