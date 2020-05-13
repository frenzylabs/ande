.PHONY: test

ROOT_DIR 	   := $(abspath $(lastword $(MAKEFILE_LIST)))
PROJECT_DIR	 := $(notdir $(patsubst %/,%,$(dir $(ROOT_DIR))))
PROJECT 		 := $(lastword $(PROJECT_DIR))
VERSION_FILE 	= VERSION
VERSION			 	= `cat $(VERSION_FILE)`
BUILD_DIR 		= ".dist"

all: run

clean:
	@yarn clean

rebuild: clean
	@yarn rebuild

run: rebuild
	@yarn dev
