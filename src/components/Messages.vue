<!-- src/components/Messages.vue -->
<template>
    <div
        id="messages"
        ref="messagesContainer"
        :class="['flex-1 overflow-y-auto mb-4 flex flex-col-reverse', { 'pr-2': hasScrollbar }]"
    >
        <!-- Lista de Mensagens -->
        <div
            v-for="message in sortedMessages"
            :key="message.id"
            :class="[
                'mb-2 p-2 max-w-xs md:max-w-md rounded-lg',
                message.author === 'Você' ? 'self-end bg-green-600 text-white' :
                message.author === 'Servidor' ? 'self-start bg-blue-600 text-white' :
                'self-start bg-gray-700 text-white',
            ]"
        >
            <div class="text-sm">
                <span class="font-semibold">{{ message.author }}</span>
                <span class="text-xs text-gray-300 ml-2">{{ formatTime(new Date(message.timestamp)) }}</span>
            </div>
            <div class="mt-1 whitespace-pre-wrap">{{ message.text }}</div>
        </div>
    </div>
</template>

<script setup>
	import { computed, nextTick, onMounted, ref, watch } from 'vue';
	import { useMessageStore } from '../stores/messageStore';

	const messageStore = useMessageStore();
	const messages = computed(() => messageStore.messages);
	const messagesContainer = ref(null);
	const hasScrollbar = ref(false);

	// Ordenar mensagens por timestamp
	const sortedMessages = computed(() => {
		return [...messages.value].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	});

	function checkForScrollbar() {
		if (messagesContainer.value) {
			const el = messagesContainer.value;
			hasScrollbar.value = el.scrollHeight > el.clientHeight;
		}
	}

	onMounted(() => {
		checkForScrollbar();
		scrollToBottom();

		const observer = new ResizeObserver(() => {
			checkForScrollbar();
		});
		if (messagesContainer.value) {
			observer.observe(messagesContainer.value);
		}
	});

	watch(messages, () => {
		nextTick(() => {
			checkForScrollbar();
			scrollToBottom();
		});
	});

	function scrollToBottom() {
		if (messagesContainer.value) {
			messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
		}
	}

	function formatTime(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	}
</script>

<style scoped>
	#messages::-webkit-scrollbar {
		width: 8px;
	}

	#messages::-webkit-scrollbar-track {
		background: #2d2d2d00;
	}

	#messages::-webkit-scrollbar-thumb {
		background-color: #6a6a6a;
		border-radius: 10px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	#messages::-webkit-scrollbar-thumb:hover {
		background-color: #969696;
	}

	#messages::-webkit-scrollbar-button {
		display: none;
	}
</style>
