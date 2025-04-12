#!/bin/bash
sleep 10
mc alias set myminio http://minio:9000 minioadmin minioadmin
mc mb myminio/podcasts
mc anonymous set download myminio/podcasts
mc policy set-json /cors.json myminio/podcasts
