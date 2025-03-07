// /src/stores/messageStore.js
import { defineStore } from 'pinia';

const API_URL = 'http://127.0.0.1:8000/api/messages';

export const useMessageStore = defineStore('messageStore', {
    state: () => ({
        messages: [],
    }),

    getters: {},

    actions: {
        async loadMessages() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch messages');
                const data = await response.json();
                this.messages = data.data;
            } catch (error) {
                console.error(error);
            }
        },

        addMessage(message) {
            this.messages.push(message)
        },

        deleteMessage(message) {
            this.messages = this.messages.filter(msg => msg.id !== message.id);
        },

        updateMessage(message) {
            const index = this.messages.findIndex(msg => msg.id === message.id);
            this.messages[index] = { ...this.messages[index], ...message };
        }
    }

});