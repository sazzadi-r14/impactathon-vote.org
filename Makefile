# Git push simplification
.PHONY: gitpushall update

update:
	git fetch
	git pull

gitpushall:
	git fetch
	git pull
	git add .
	git commit -m "$(m)"
	git push
