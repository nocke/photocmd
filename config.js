const config = module.exports = {};

// MUST ALL BE LOWER CASE !
// image formats, except raw (defines non-lonelyness)
config.extensions_image = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'psd'];
// COULDDO: distinguish type and alternative spellings ('jpeg') if need comes up
// raw formats
config.extensions_raw = ['cr', 'raw', 'cr2', 'cr3', 'nef'];
// tag-alongs: adobe sidecar, dxo sidecar
config.sidecars = ['xmp', 'dop'];

// combining them all
config.extensions = [
	...config.extensions_image,
	...config.extensions_raw,
	...config.sidecars
];


// COULDDO: wellknown temp files (see .gitignore), still counting as empty dir (thumbsdb, etc)

// COULDDO option to prune deserted sidecar files (nef, xmp, ...)

// list of core matchers.
// Priority does matter, first one winds (i.e Android-date before Android-generic).
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
