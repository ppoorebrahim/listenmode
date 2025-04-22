#!/bin/bash

# Setup log file
LOGFILE="setup-summary.txt"
exec 1> >(tee -a "$LOGFILE") 2>&1

echo "=== ListenMode Setup Summary $(date) ===" | tee -a "$LOGFILE"
echo "----------------------------------------" | tee -a "$LOGFILE"

# Function to log section headers
log_section() {
    echo -e "\n=== $1 ===" | tee -a "$LOGFILE"
}

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo "✅ $1 successful" | tee -a "$LOGFILE"
    else
        echo "❌ $1 failed" | tee -a "$LOGFILE"
        if [ "$2" = "critical" ]; then
            echo "Critical error. Exiting..." | tee -a "$LOGFILE"
            exit 1
        fi
    fi
}

# Install backend dependencies
log_section "Installing Backend Dependencies"
cd backend
npm install
check_status "Backend npm install"

# Install frontend dependencies
log_section "Installing Frontend Dependencies"
cd ../frontend
npm install
check_status "Frontend npm install"

# Build frontend
log_section "Building Frontend"
npm run build
check_status "Frontend build"

# Create MinIO initialization script
log_section "Creating MinIO Init Script"
cd ..
mkdir -p scripts
cat > scripts/init-minio.sh << 'EOF'
#!/bin/bash
until curl -sf "http://minio:9000/minio/health/live"; do
    echo "Waiting for MinIO to be ready..."
    sleep 5
done

mc alias set local http://minio:9000 minioadmin minioadmin
mc mb local/podcasts --ignore-existing
mc policy set public local/podcasts

cat > cors.json << 'EOCORS'
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": ["ETag"]
        }
    ]
}
EOCORS

mc anonymous set-json cors.json local/podcasts
EOF

chmod +x scripts/init-minio.sh
check_status "MinIO init script creation"

# Start Docker services
log_section "Starting Docker Services"
docker-compose down -v
docker-compose up --build -d
check_status "Docker services startup"

# Wait for services to be ready
log_section "Checking Service Health"
sleep 10

# Check each service
services=("frontend:3000" "backend:4001" "minio:9000" "grafana:3001" "prometheus:9090")
for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    curl -sf "http://localhost:$port" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ $name is running (port $port)" | tee -a "$LOGFILE"
    else
        echo "❌ $name is not responding (port $port)" | tee -a "$LOGFILE"
    fi
done

# Check database
docker-compose exec -T db pg_isready
check_status "PostgreSQL health check"

# Check Redis
docker-compose exec -T redis redis-cli ping
check_status "Redis health check"

# Initialize MinIO
log_section "Initializing MinIO"
docker-compose exec -T minio /app/scripts/init-minio.sh
check_status "MinIO initialization"

# Check API endpoints
log_section "Checking API Endpoints"
curl -sf "http://localhost:4001/api/podcasts" > /dev/null
check_status "Podcasts API endpoint"

curl -sf "http://localhost:4001/health" > /dev/null
check_status "Health endpoint"

# Collect Docker logs
log_section "Service Logs"
docker-compose logs > docker-logs.txt
echo "Docker logs saved to docker-logs.txt" | tee -a "$LOGFILE"

echo -e "\n=== Setup Complete ===" | tee -a "$LOGFILE"
echo "Check setup-summary.txt and docker-logs.txt for details" 