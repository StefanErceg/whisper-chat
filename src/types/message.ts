export interface Message {
	content: string;
	sender: string;
	meta: {
		id: string;
		timestamp: number;
	};
}
