.PHONY: build
.PHONY: exec
.PHONY: login
.PHONY: push
.PHONY: pull
.PHONY: rmc
.PHONY: rmi
.PHONY: run
.PHONY: tag
.PHONY: zip

AWS_ACCOUNT_ID := $(shell aws sts get-caller-identity --query Account --output text --profile default)
AWS_REGION := $(shell aws configure get region --profile default)
# Give me Container ID that is running and you want to execute something within it.
# ex) make exec container_id=xxxxxx
container_id := container_id
CONTAINER_IMAGE := app:latest
AWS_ECR_TAG := $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/app

build:
	@docker image build -t $(CONTAINER_IMAGE) .

run:
	@docker container run -itd -p 3000:3000 $(CONTAINER_IMAGE)

exec:
	@docker container exec -it $(container_id) sh

login:
	$(call blue , "Login ECR")
	@aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

push:
	$(call blue , "Push Docker Images")
	@docker image push $(AWS_ECR_TAG)

pull:
	$(call blue , "Pull Docker Images")
	@docker image pull $(AWS_ECR_TAG)

rmc:
	$(call blue, "Remove containers")
	@docker container ps -aq | xargs docker container rm -f

rmi:
	$(call blue, "Remove images")
	@docker image ls -aq | xargs docker image rm -f

tag:
	$(call blue , "Tag the Docker image with Repositry")
	@docker image tag $(CONTAINER_IMAGE) $(AWS_ECR_TAG)

zip:
	$(call blue , "zip sources")
	@zip -r app.zip . \
		--exclude=*.git* \
		--exclude=node_modules/**\* \
		--exclude=Dockerfile \
		--exclude=.gitignore \
		--exclude=.dockerignore \
		--exclude=npm-packages-offline-cache/**\* \
		--exclude=build/**\*

define blue
	@tput setaf 6 && echo $1 && tput sgr0
endef
