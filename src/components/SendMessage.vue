<template>
	<div class="relative" ref="emojiPickerRef">
		<input type="text" v-model="newMessage" placeholder="Digite sua mensagem..."
			class="w-full p-2 rounded pl-10 pr-12 outline-none bg-gray-700 text-gray-200 placeholder-gray-400"
			@keyup.enter="sendMessage" />

		<!-- Botão de Emoji -->
		<button @click="toggleEmojiPicker"
			class="absolute inset-y-0 left-2 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none">
			<FaceSmileIcon class="h-6 w-6" />
		</button>

		<!-- Dropdown de Emojis -->
		<div v-if="isEmojiPickerVisible"
			class="absolute bottom-full left-0 bottom-[48px] w-full bg-gray-700 rounded-lg shadow-lg p-2 z-10">
			<div class="grid grid-cols-8 gap-2">
				<button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)"
					class="text-xl focus:outline-none">
					{{ emoji }}
				</button>
			</div>
		</div>

		<!-- Botão de Enviar -->
		<button @click="sendMessage" class="absolute inset-y-0 right-2 flex items-center">
			<PaperAirplaneIcon class="h-6 w-6 text-gray-400 hover:text-green-500 " />
		</button>
	</div>
</template>

<script setup>
	import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid';
	import { onBeforeUnmount, onMounted, ref } from 'vue';
	import { useMessageStore } from '../stores/messageStore';

	const emojiPickerRef = ref(null);
	const isEmojiPickerVisible = ref(false);

	const emojis = [
		'😀', '😂', '😍', '😎', '😢', '👍', '🙏', '🎉',
		'❤️', '🔥', '🚀', '🌟', '💯', '🥰', '🤔', '😴',
		'🤗', '😇', '😈', '👻', '💀', '👽', '🤖', '🎃'
	];

	const newMessage = ref('');
	const messageStore = useMessageStore();

	// Função para enviar a mensagem
	function sendMessage() {
		if (newMessage.value.trim() === '') {
			return;
		}

		messageStore.sendMessage(newMessage.value);
		newMessage.value = '';
	}

	function addEmoji(emoji) {
		newMessage.value += emoji;
		isEmojiPickerVisible.value = false;
	}

	function toggleEmojiPicker() {
		isEmojiPickerVisible.value = !isEmojiPickerVisible.value;
	}

	function handleClickOutside(event) {
		if (emojiPickerRef.value && !emojiPickerRef.value.contains(event.target)) {
			isEmojiPickerVisible.value = false;
		}
	}

	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<style scoped>
	.text-xl {
		cursor: pointer;
		transition: transform 0.2s;
	}

	.text-xl:hover {
		transform: scale(1.2);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>