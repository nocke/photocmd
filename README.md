# PhotoCmd

## — _a command-line tool for working with ‘families’ of photos, syncing metadata, deleting and renaming_

PhotoCmd is a command line tool to deal with digital images (jpg, png, raw). It's _*not_ meant to compote with [Exiftool](http://owl.phy.queensu.ca/~phil/exiftool/) or [ImageMagick](https://www.imagemagick.org/script/index.php), rather it employs these and focuses on the concept of **image families** of related images:

	IMG_0635.JPG                  // original image (probably)
	IMG_0635_retouche.psd         // some photoshop enhancements (in the work)
	IMG_0635_bg_more-blurry.jpg   // a save, derived copy

	PM5A0039.CR2                  // another family: the original raw image
	PM5A0039.jpg                  // the jpeg saved along with (common in many DLSRs)
	PM5A0039.CR2.dop              // a sidecar related to it (by DxO raw converter)
	PM5A0039.CR2.xmp              // another sidecar (XMP meta data)
	PM5A0036_DXs1.jpg             // one raw->jpeg conversion (possibly done with DxO
	PM5A0039_acr.jpg              // an alternative conversion (done with Adobe Camera Raw?)

    PM5A0042_DXs2.jpg             // another familty (a ‘lonely’ image)
    00PM5A0045.CR2                // another family (the typical DSLR couple)
	picasa.ini                    // a (legacy) picasa file with some metadata for the entire folder


Common tasks with freshly shot images that made me write this tool were:

* **shoot**: shoot a ton of images (most often with my DLSR, saving both jpg+raw)
* **selected tages**: star images that are basically not crap (in another tool. Just looking at the jpg is much faster and enough )

* **prunce junk** I want to delete unstarred images. Sure this could be done in any GUI, but (first tedious manual issue) I also want to delete their raw counterparts and possibly all sidecars that already got generated

    $> photo ...

* **metadata stamping**: especially under time pressue, it's nice if you can preconfigure things and the just let's go...

    $> photo ...

* ...also to have several ready-made configuration, i.e. copyright and free-to-use:

    $> photo ...

* **metadata syncing**: After you tediously tagged each image on fine-grained level (geolocation, people or scenery contained, tags and caption...) you want all members of that image family to benefit from it, do you? The jpg, the raw, even the raw converted jpg and the touched up psd is sure to have the same content, the same location and caption. Heavy cropping might change this a little, but 95% of the time.

    $> photo ...

* **metadata interpolation**: tbd...


* beyond those 95% deleted: some pictures might qualify als „great shot“ (=keep the raw, to later pull the best out of it), some just as „snapshot“ to keep. For the former, I want to keep the entire family, for the latter, keeping the jpg is just enough. This can be achieved by agreeing to a certain tag (default is...):

    $> photo ...

* always the same pain: timestamp offset. Least thinking required: photograph a reliable clock, tell the name of the image and the time seen in it. Tool will pull exif date, build the time difference, do it's job (for all images, or by criteria. i.e. before mixing with alternate cameras / friends pictures... )


* distribution ... (into preconfigured channels)

----
## Status

I am currently in the process of rewriting my (very proven but somewhat outdated) PHP version of this tool in javascript.

I _did_ set up the parameter parsing using [commander](https://github.com/tj/commander.js), dispatching to difference action classes and the general iteration loop for it.

More to be done...

----
## Running it:

The bin-section of the [package.json](package.json) defines it as a command line command:

— DRAFT, work in progress, DRAFT —

```

	$> photo
	Usage: photo [options] [command]

	Commands:

	delete [options] <dir> [moreDirs...]  delete "lonely" images of sorts

	Options:

	-h, --help     output usage information
	-V, --version  output the version number


	examples:

```

----
## Development

Most ofthe time you will just want:

`npm start` – starts watching (`src/` and `test/` folder), rebuilds and tests on change.

#### build

`npm run build` – build ES6 → ES5 once

`npm run watch` – to keep compiling ES6 → ES5

#### test

`npm run test` – conduct tests (on build ES5 sources) once
* ensure ES6 transpilation
* smoke test

`npm run test-watch` – watch source files and keep testing

----
## License

The content on this project are released under the (very permissive) terms of the [MIT license](LICENSE). The MIT License is simple and easy to understand and places almost no restrictions on what you can do with the Project.
