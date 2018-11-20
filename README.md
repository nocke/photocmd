# Photo

## — _a command-line tool for working with ‘families’ of photos, syncing metadata, deleting and renaming_

[![Build Status](https://travis-ci.com/nocke/photocmd.svg?branch=master)](https://travis-ci.com/nocke/photocmd)

### Introduction...

A typical photography workflow looks like this

1. **shoot**: shoot a ton of images (most often with my DLSR, saving both jpg+raw)
2. **selected tages**: concentrate on jpgs (filtering out their raw counterparts). Star images that are good, deleting those unstarred ones. (in another tool like Lightroom, Picasa or Digikam)

3. **prune junk** I want to delete the counterparts of those 'lonely', unstarred images. Sure this could be done in any GUI, but (first tedious manual issue).Also all sidecars that got generated.

So far, the last point is, what `photo` does. Deleting lonely raw's and all sidecars of the same **'image family'**, provided the jpg of that family got deleted:

Commonly after some (re)working a photo directory contains files like these:

```
    IMG_0635.JPG           // original image (probably)
    IMG_0635_retouche.psd  // some photoshop enhancements (in the work)
    IMG_0635_bg_blur.jpg   // another derived copy

    PM5A0039.CR2           // another family: the original raw image
    PM5A0039.jpg           // the jpeg stored besides (common in many DLSRs)
    PM5A0039.CR2.xmp       // XMP sidecar (after some image organizer edits)
    PM5A0039.CR2.dop       // a sidecar related to it (courtesy of DxO raw converter)
    PM5A0036_DXs1.jpg      // one raw->jpeg conversion (possibly done with DxO
    PM5A0039_acr.jpg       // an alternative conversion (done with Adobe Camera Raw?)

    PM5A0042_DXs2.jpg      // another familty (a ‘lonely’ image)
    00PM5A0045.CR2         // another family (the typical DSLR couple)
    picasa.ini             // a (legacy) file with metadata (entire folder)
```

## CLI Usage:

```
    $> photo del --help

    delete "lonely" or "unstarred" families of images

    Options:

        --version        print out version information

        -l, --live       actually do it
        -v, --verbose    log more details
        -o, --lonely     delete lone images
        -s, --unstarred  delete unstarred images
        --skipCountdown  skip countdown on actual delete
        -h, --help       output usage information
```

## CLI Examples:

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

`yarn install` – before all else. naturally.

`yarn clean` – cleans the `dist` output and all cache dirs (not node_modules)


## CLI build & test

### development

`yarn cli:watch` – builds in `dist/cli` and keeps watching

Yes, photocmd is written for nodeJS, but use `import`, ES6 `Map` and spread operators, so this is still needed...

`yarn cli:build` – just builds in `dist/cli` and keeps watching

### test

`yarn cli:test` – runs the full test suite. No building needed for this.

A few tests requires the existence of rather large test files (around 150 MB). These have been ‘outsourced’ to [another repository](https://github.com/nocke/photocmd-testfiles), automatically loaded through `yarn install` as a regular package.json module dependency.

----
## Electron UI build

The user interface to be...

#### yarn tasks for develop:

`yarn start` will be enough to have a watch process for renderer and main, compiling into `dist/app/development` and the main window pop open:

client-side changes should...
server-side changes need reload(?)...

```
start
    ├ ui:develop:renderer
    │   • watches the `client side’,
    │   • loading through localhost://
    └ ui:develop:main
       │
       ├ ui:develop:main:build
       │   • builds the electron main
       └ ui:develop:start
           • starts the electron app
```

#### yarn tasks for release:

```
ui:release:build
    ├ ui:release:build:main
    │    • just builds, no watching
    │    • loading through file://
    └ ui:release:build:renderer
         • just builds the `client side’

ui:release:start
    start release build to verify…
    • no more security warnings
    • resources load through file
    ( re-run ui:release:build:renderer
      to see reloadable changes )
```

**`dist`** runs `ui:release:build` first, then packages things with target `electron:build` (based on [`electron-builder`](https://github.com/electron-userland/electron-builder))

----
## License

The content on this project are released under the (very permissive) terms of the [MIT license](LICENSE). The MIT License is simple and easy to understand and places almost no restrictions on what you can do with the project.

The Roboto font family and material-design-icons are used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), see [here](https://fonts.google.com/specimen/Roboto) and [here](https://google.github.io/material-design-icons/#licensing) for more information.

