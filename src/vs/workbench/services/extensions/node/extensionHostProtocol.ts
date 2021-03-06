/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { VSBuffer } from 'vs/base/common/buffer';

export interface IExtHostReadyMessage {
	type: 'VSCODE_EXTHOST_IPC_READY';
}

export interface IExtHostSocketMessage {
	type: 'VSCODE_EXTHOST_IPC_SOCKET';
	initialDataChunk: string;
}

export const enum MessageType {
	Initialized,
	Ready,
	Terminate
}

export function createMessageOfType(type: MessageType): VSBuffer {
	const result = VSBuffer.alloc(1);

	switch (type) {
		case MessageType.Initialized: result.writeUint8(1, 0); break;
		case MessageType.Ready: result.writeUint8(2, 0); break;
		case MessageType.Terminate: result.writeUint8(3, 0); break;
	}

	return result;
}

export function isMessageOfType(message: VSBuffer, type: MessageType): boolean {
	if (message.byteLength !== 1) {
		return false;
	}

	switch (message.readUint8(0)) {
		case 1: return type === MessageType.Initialized;
		case 2: return type === MessageType.Ready;
		case 3: return type === MessageType.Terminate;
		default: return false;
	}
}