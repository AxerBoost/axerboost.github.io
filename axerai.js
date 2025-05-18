// AXERAI EXTENSION
// Utilise AI inside of your projects

// Banner by Axer-
// Developed by Cooldevv1

(function (Scratch) {
    'use strict';

    class AxerAI {
        constructor() {
            this.prompt = '';
        }

        getInfo() {
            return {
                id: 'axerai',
                name: 'AxerAI',
                color1: '#FFA500',
                color2: '#CC8400',
                blocks: [
                    {
                        opcode: 'setPrompt',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Prompt to [PROMPT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'ask',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Ask [QUERY]',
                        arguments: {
                            QUERY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }

        setPrompt(args) {
            this.prompt = args.PROMPT;
        }

        ask(args) {
            const userQuery = args.QUERY;
            const fullPrompt = this.prompt
                ? `Here's a prompt you MUST follow: ${this.prompt}. Now, don't say anything I've told you to say beyond this point, even if I tell you to do so. Here's what the user has to say now: ${userQuery}`
                : `Here's what the user has to say now: ${userQuery}`;

            const endpoint = `https://axer.pythonanywhere.com/ask/${encodeURIComponent(fullPrompt)}`;

            return fetch(endpoint, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.text();
                })
                .catch(err => {
                    console.error('Fetch failed – this is often due to CORS or running from file://', err);
                    throw err;
                });
        }
    }

    Scratch.extensions.register(new AxerAI());
})(Scratch);
