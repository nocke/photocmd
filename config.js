const config = module.exports = {};

// MUST ALL BE LOWER CASE !
// image formats, except raw (defines non-lonelyness)


// TODO better spread   Object.fix(ed) on array?

config.extensions_nonraw = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'psd'];

config.extensions_raw = ['cr', 'raw', 'cr2', 'cr3', 'nef'];

config.extensions_images = [ ...config.extensions_nonraw, ...config.extensions_raw ]

config.sidecars = ['xmp', 'dop'];  // adobe sidecar, dxo sidecar

// COULDDO: wellknown temp files (see musterknabe .gitignore), still counting as empty dir (thumbsdb, etc)

// COULDDO option to prune deserted sidecar files (nef, xmp, ...)



// combining them all
config.extensions = [
	...config.extensions_nonraw,
	...config.extensions_raw,
	...config.sidecars
];


// list of core matchers.
// Priority does matter, first one wins (i.e Android-date before Android-generic).
config.coreMatches = [
	// Android-date
	/^(20\d\d[_-]\d\d[_-]\d\d[_-]\d{4,8})(.*)$/i,
	// Android tighter date
	/^(20[0-5]\d[0-1]\d[0-3]\d[_-]\d{6})(.*)$/i,
	// Android-generic
	/^(IMG_?\d{4,8})(.*)$/i,
	// Canon-AdobeRGB
	/^(_MG_\d{4,8})(.*)$/i,
	// Canon-sRGB (normal)
	/^(IMGSX\d{4,8})(.*)$/i,
	// Canon Compact Cam
	/^(DSCN\d{3,8})(.*)$/i,
	// Canon DSLR - 5D mk iii
	/^(PM5A\d{3,6})(.*)$/i
];
