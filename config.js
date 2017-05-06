const config = module.exports = {};


// supported image extensions - MUST ALL BE LOWER CASE !
config.extensions = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'cr', 'raw', 'cr2', 'cr3', 'nef', 'psd'];
// subset of prior; needed for lonely flag
config.extensions_raw = ['cr', 'raw', 'cr2', 'cr3', 'nef'];
// tag-alongs: adobe sidecar, dxo sidecar
config.sidecars = ['xmp', 'dop'];


