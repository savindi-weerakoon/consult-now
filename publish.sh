#!/bin/bash

ACCOUNT_ID=696051617304
REGION=eu-north-1

echo "🔁 Building Docker images..."
docker build -t booking-service:latest ./services/booking-service
docker build -t user-profile-service:latest ./services/user-profile-service
docker build -t message-service:latest ./services/message-service
docker build -t frontend:latest ./app

echo "🏷️ Tagging images for ECR..."
docker tag booking-service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/booking-service:latest
docker tag user-profile-service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/user-profile-service:latest
docker tag message-service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/message-service:latest
docker tag frontend:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend:latest

echo "📦 Pushing images to Amazon ECR..."
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/booking-service:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/user-profile-service:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/message-service:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/frontend:latest

echo "✅ All images pushed to ECR."

# Uncomment below to clean + re-deploy if needed
# echo "🧹 Deleting old Kubernetes deployments..."
# kubectl delete -f k8s/

# echo "🚀 Re-applying Kubernetes deployments..."
# kubectl apply -f k8s/

# Uncomment to selectively restart deployments (if images are updated but config isn’t)
# kubectl rollout restart deployment booking-service
# kubectl rollout restart deployment user-profile-service
# kubectl rollout restart deployment message-service
# kubectl rollout restart deployment frontend
