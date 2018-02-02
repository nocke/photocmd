'use strict'
import config from '../../config';
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../log';

class Member {

	constructor(pathObj) {
		// copy 'em all (much preparation already happens one level up in Family)
		Object.assign(this, pathObj);

		// create type
		switch (this.ext.toLowerCase()) {
			// regular extensions - just lowercase
			case 'png':
			case 'psd':
			case 'jpg':
			case 'tif':
			case 'xmp':
				this.type = this.ext.toLowerCase();
				break;

				// special cases
			case 'jpeg':
				this.type = 'jpg';
				break;
			case 'tiff':
				this.type = 'tif';
				break;
				// → en.wikipedia.org/wiki/Raw_image_format
			case 'crw':
			case 'cr2':
			case 'dng':
			case 'raw':
				this.type = 'raw';
				break;
		} // switch

		// TODO:
		//   exiftool parse-file
		//   title, caption
		//   dates (and file-date)
		//   star status


	}

}

export default Member;
