# This is the default target, which will be built when
# you invoke make
.PHONY: all
all: out

# This rule creates the output directories and copies the files there
out:
	mkdir -p ../bin/
	cp ./src/start.sh ../bin/
	cp ./src/stop.sh ../bin/

# This rule tells make to delete the output files
.PHONY: clean
clean:
	rm -rf ../bin/