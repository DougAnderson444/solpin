import { DATA_BLOB_BYTE_LENGTH } from '../constants.js';
import BufferLayout from 'buffer-layout';
// https://pabigot.github.io/buffer-layout/module-Layout-Blob.html

export class DataLayouts {
	static get() {
		let dataLayouts = [];

		dataLayouts.push({
			name: 'greeting',
			layout: BufferLayout.struct([BufferLayout.blob(DATA_BLOB_BYTE_LENGTH, 'txt')])
		});

		return dataLayouts;
	}
}
