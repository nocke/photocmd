'use strict'
import config from '../../config';
import {enforce, fail} from '../helpers';

 class Member {

	constructor(pathObj) {
		// copy 'em all
		Object.assign(this,pathObj);
	}

}

export default Member;
