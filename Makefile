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
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8
