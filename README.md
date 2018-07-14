# Photo

## — _a command-line tool for working with ‘families’ of photos, syncing metadata, deleting and renaming_

A typical photography workflow looks like this

* **shoot**: shoot a ton of images (most often with my DLSR, saving both jpg+raw)
* **selected tages**: concentrate on jps (filtering out their raw counterparts). Star images that are good, deleting those unstarred ones. (in another tool)

* **prunce junk** I want to delete the counterparts of those 'lonely', unstarred images. Sure this could be done in any GUI, but (first tedious manual issue).Also all sidecars that got generated.

So far, that's what `photo` does. Deleting lonely raw's and all sidecars of the same **'image family'**, provided the jpg of that family got deleted:


```
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
```

## Usage:

```
    $> photo del --help

	delete "lonely" or "unstarred" families of images

	Options:

		-l, --live       actually do it
		-v, --verbose    log more details
		-o, --lonely     delete lone images
		-s, --unstarred  delete unstarred images
		--skipCountdown  skip countdown on actual delete
		-h, --help       output usage information
```

## Example:

```
	photo del . -lv

	$>photo del sample2/ -l

	deleting sample2/DSCN7029.CR2 ...
	deleting sample2/IMGSX9999.xmp ...
	deleting sample2/PM5A2087.cr2 ...
	deleting sample2/PM5A2087.cr2.dop ...
	deleting sample2/PM5A29999.cr2.dop ...
	deleting sample2/PM5A3095_lonely.CR2 ...

	statistics PREVIEW ________
	{
	"familiesTotal": 11,
	"familiesToDelete": 5,
	"familiesDeleted": 5,
	"filesTotal": 14,
	"filesDeleted": 6
	}
	counting 3 ...
	counting 2 ...
	counting 1 ...
	counting 0 ...

	statistics ____________________
	{
	"familiesTotal": 11,
	"familiesToDelete": 5,
	"familiesDeleted": 10,
	"filesTotal": 14,
	"filesDeleted": 12
	}

```

----

## Future plans (haha)

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

## development

`npm install` – before all else. naturally.

Most of the time you will just want:

### build

`npm run build` – build ES6 → ES5 once ( Yes, it's a tool written & running on nodeJS, but to use `import`, ES6 `Map` and spread operators this is still needed...)

`npm run watch` – builds once and starts watching `src/` folder, rebuilds and tests on change. Not needed for running tests

### test

`npm run test` – conduct tests (on build ES5 sources) once

`npm run test-watch` – watch source files and keep testing

`cls && npm run test-single -- test/commandDelete.test.js`

Some tests require the existence of a large file named `sample2.zip`. Contact me if you need it.

----
## License

The content on this project are released under the (very permissive) terms of the [MIT license](LICENSE). The MIT License is simple and easy to understand and places almost no restrictions on what you can do with the project.
