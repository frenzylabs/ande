.PHONY: test

ROOT_DIR 	   := $(abspath $(lastword $(MAKEFILE_LIST)))
PROJECT_DIR	 := $(notdir $(patsubst %/,%,$(dir $(ROOT_DIR))))
PROJECT 		 := $(lastword $(PROJECT_DIR))
VERSION_FILE 	= VERSION
VERSION			 	= `cat $(VERSION_FILE)`
BUILD_DIR 		= ".dist"

all: run

clean:
	@yarn clean \
	&& rm -rf ${BUILD_DIR}

rebuild: clean
	@yarn rebuild

run: rebuild
	@yarn dev

build_ui:
	@yarn parcel:build

dist_mac: rebuild build_ui
	@yarn dist-mac

dist_windows: rebuild build_ui
	@yarn dist-windows

