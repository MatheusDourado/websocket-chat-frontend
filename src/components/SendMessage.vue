<template>
	<div class="relative">
		<input type="text" v-model="newMessage" placeholder="Digite sua mensagem..."
			class="w-full p-2 rounded pr-12 outline-none bg-gray-700 text-gray-200 placeholder-gray-400"
			@keyup.enter="sendMessage" />
		<button @click="sendMessage" class="absolute inset-y-0 right-2 flex items-center">
			<PaperAirplaneIcon class="h-6 w-6 text-gray-400 hover:text-green-500 " />
		</button>
	</div>
</template>
  

<script setup>
	import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';
	import { ref } from 'vue';
	import { useMessageStore } from '../stores/messageStore';

	const newMessage = ref('');
	const messageStore = useMessageStore();

	function sendMessage() {
		if (newMessage.value.trim() === '') {
			return;
		}
		// Enviar a mensagem pelo WebSocket
		messageStore.sendMessage(newMessage.value);
		newMessage.value = '';
	}
</script>

<style scoped>

</style>
