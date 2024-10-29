// src/stores/messageStore.js
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUIDs
import { onBeforeUnmount, ref } from 'vue';

export const useMessageStore = defineStore('messageStore', () => {
	const messages = ref([]);
	let socket;

	function initWebSocket() {
		socket = new WebSocket('https://websocket-chat-server-lof2.onrender.com'); 

		socket.addEventListener('open', () => {
			console.log('Conectado ao WebSocket');
		});

		socket.addEventListener('message', (event) => {
			console.log('Mensagem recebida:', event.data);
			console.log('Tipo de event.data:', typeof event.data);

			if (typeof event.data === 'string') {
				try {
					const data = JSON.parse(event.data);
					// Verifica se a mensagem já existe com base no ID
					if (!messages.value.some((msg) => msg.id === data.id)) {
						messages.value.push(data);
					}
				} catch (error) {
					console.error(
						'Erro ao analisar a mensagem recebida:',
						error,
					);
					console.log('Dados recebidos:', event.data);
				}
			} else {
				console.error('Mensagem não é uma string. Ignorando...');
				console.log('Dados recebidos:', event.data);
			}
		});

		socket.addEventListener('close', () => {
			console.log(
				'WebSocket fechado. Tentando reconectar em 5 segundos...',
			);
			setTimeout(initWebSocket, 5000); // Tenta reconectar após 5 segundos
		});

		socket.addEventListener('error', (error) => {
			console.error('Erro no WebSocket:', error);
			socket.close();
		});
	}

	function sendMessage(text) {
		if (socket && socket.readyState === WebSocket.OPEN) {
			const message = {
				id: uuidv4(), // Gera um UUID único para a mensagem
				author: 'Você',
				text: text,
				timestamp: new Date().toISOString(),
			};
			socket.send(JSON.stringify(message));
			messages.value.push(message); // Adiciona a mensagem localmente
		} else {
			console.error('WebSocket não está conectado.');
		}
	}

	// Inicializar o WebSocket quando o store for criado
	initWebSocket();

	// Garantir que a conexão seja fechada ao desmontar o componente
	onBeforeUnmount(() => {
		if (socket) {
			socket.close();
		}
	});

	return {
		messages,
		sendMessage,
	};
});
