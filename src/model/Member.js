'use strict'
import config from '../../config';
import {enforce, fail} from '../utils';


/*
 *  b) data structure of (family) Members
 *     basename - i.e.  DSC09470_retouche.jpg
 *     stem     - basename w/o extension, i.e. DSC09470_retouche
 *     ext      - extension, i.e. jpg
 */

 class Member {

		static sayHi(){

			console.log('Hi Member!');

		}

}

export default Member;
