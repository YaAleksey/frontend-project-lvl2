install:
	npm install

publish:
	npm publish --dry-run

addCommit:
	git add --all

lint: 
	npx eslint --fix .

test:
	npx -jest

test-coverage:
	npx -n --experimental-vm-modules jest --coverage --coverageProvider=v8
