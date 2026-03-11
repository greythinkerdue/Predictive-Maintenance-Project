pipeline {
    agent any

    environment {
        // Nama image harus lowercase ya biar aman di Docker
        DOCKER_IMAGE = "predictive-maintenance-api"
        DOCKER_TAG = "${env.BUILD_ID}"
        APP_PORT = "5000"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Pake 'bat' karena kamu di Windows
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Pastiin di package.json kamu ada script "test" ya!
                // Kalau gak ada, tahap ini bakal bikin Jenkins MERAH.
                bat 'npm test' 
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application container...'
                // Stop & hapus container lama biar gak bentrok port-nya
                bat "docker stop ${DOCKER_IMAGE} || exit 0"
                bat "docker rm ${DOCKER_IMAGE} || exit 0"
                bat "docker run -d --name ${DOCKER_IMAGE} -p ${APP_PORT}:${APP_PORT} ${DOCKER_IMAGE}:latest"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo "CI/CD Pipeline Succeeded! App is live at http://localhost:${APP_PORT}"
        }
        failure {
            echo 'CI/CD Pipeline Failed! Check the logs above.'
        }
    }
}