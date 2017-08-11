'use strict'
import config from '../../config';
import {enforce, fail} from '../helpers';


/*
 *  b) data structure of (family) Members
 *     basename - i.e.  DSC09470_retouche.jpg
 *     stem     - basename w/o extension, i.e. DSC09470_retouche
 *     ext      - extension, i.e. jpg
 */

 class Member {

	// COULDDO: deal with root and platform separator for windows:
	// https://nodejs.org/api/path.html#path_path_parse_path

	/**
	 * 
	 * @param {*} pathObj 
	 * { root: '',  // not used
	 *   dir: '',
	 *   base: 'PM5A2847.JPG',
	 *   ext: 'JPG',
	 *   name: 'PM5A2847' }
	 * 
	 */
	constructor(pathObj) {




	}

}

export default Member;
