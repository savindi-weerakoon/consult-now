#!/bin/bash

ACCOUNT_ID=696051617304
REGION=eu-north-1

# Rebuild
docker build -t booking-service:latest ./services/booking-service
docker build -t user-profile-service:latest ./services/user-profile-service

# Tag
docker tag booking-service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/booking-service:latest
docker tag user-profile-service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/user-profile-service:latest

# Push
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/booking-service:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/user-profile-service:latest

# Restart in EKS
kubectl rollout restart deployment booking-service
kubectl rollout restart deployment user-profile-service

# # clean re-apply deployment
# kubectl delete -f k8s/

# # re-apply deployment
# kubectl apply -f k8s/
