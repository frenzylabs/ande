.PHONY: test

ROOT_DIR 	   := $(abspath $(lastword $(MAKEFILE_LIST)))
PROJECT_DIR	 := $(notdir $(patsubst %/,%,$(dir $(ROOT_DIR))))
PROJECT 		 := $(lastword $(PROJECT_DIR))
VERSION_FILE 	= VERSION
VERSION			 	= `cat $(VERSION_FILE)`
BUILD_DIR 		= ".dist"

OS_DIST := 

ifeq ($(OS),Windows_NT)
    OS = "windows"
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        OS = "linux"
    endif
    ifeq ($(UNAME_S),Darwin)
        OS = "macos"
    endif
endif

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

release_mac: rebuild build_ui
	@yarn dist-mac

build_windows: rebuild build_ui
	@yarn dist-windows

ifeq ($(OS),Windows_NT)
release: release_windows
else
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
release:
	@echo "No linux yet."
endif
		
ifeq ($(UNAME_S),Darwin)
release: release_mac
endif
endif
