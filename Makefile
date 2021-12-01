install:
	npm install

publish:
	npm publish --dry-run

addCommit:
	git add --all

lint: 
	npx eslint --fix .

test:
	npx jest --watch

test-coverage:
	npx jest --coverage --coverageProvider=v8
