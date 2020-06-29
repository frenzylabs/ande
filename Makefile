.PHONY: test

ROOT_DIR 	   := $(abspath $(lastword $(MAKEFILE_LIST)))
PROJECT_DIR	 := $(notdir $(patsubst %/,%,$(dir $(ROOT_DIR))))
PROJECT 		 := $(lastword $(PROJECT_DIR))
VERSION_FILE 	= VERSION
VERSION			 	= `cat $(VERSION_FILE)`
BUILD_DIR 		= ".dist"

all: run

deps:
	@yarn install --check-files

clean:
	@yarn clean \
	&& rm -rf ${BUILD_DIR}

rebuild: clean
	@yarn rebuild

run: rebuild
	@yarn dev

build_ui:
	@parcel build src/index.html --out-dir dist --no-cache --public-url ./ --target electron --bundle-node-modules

build: rebuild build_ui
	@electron-builder --x64 --mac --win --publish never

release: rebuild build_ui
	@electron-builder --mac --win --publish always

package: deps rebuild build_ui
	@electron-builder .

dist: package
	@git add . \
	&& git commit -am "Release of version ${VERSION}" \
	&& git tag v${VERSION} \
	&& git push && git push --tags
