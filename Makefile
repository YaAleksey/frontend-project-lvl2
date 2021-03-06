install:
	npm install

publish:
	npm publish --dry-run

addCommit:
	git add --all

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npx jest -- --coverage --coverageProvider=v8

