# This is the default target, which will be built when
# you invoke make
.PHONY: all
all: out

# This rule creates the output directories and copies the files there
out:
	mkdir -p ./out
	cp ./src/start.sh ./out/
	cp ./src/stop.sh ./out/
	cp ./src/uninstall.sh ./out/

# This rule tells make to delete the output files
.PHONY: clean
clean:
	rm -rf ./out