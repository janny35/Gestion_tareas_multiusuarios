pipeline {
  agent none
  parameters {
    string defaultValue: 'docker1', description: 'proyecto final del modulo 8 aplicando CI/CD', name: 'BRANCH', trim: false
    string defaultValue: 'virtual_dev', description: 'maquina virtual para el  esclavo en VM', name: 'LABEL_NODE_DEV', trim: false
    string defaultValue: 'virtual_dev', description: 'maquina virtual para el esclavo para el  QA', name: 'LABEL_NODE_QA', trim: false
    string defaultValue: 'virtual_prod', description: 'maquina virtual para el  Master principal', name: 'LABEL_NODE_PROD', trim: false
  }
  environment{
    DEVELOP="${params.LABEL_NODE_DEV}"
    QA="${params.LABEL_NODE_QA}"
    PRODUCTION="${params.LABEL_NODE_PROD}"
  }
  stages {
    stage('cloning') {
      agent { label DEVELOP }
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/janny35/Gestion_tareas_multiusuarios.git'
        sh 'echo "Repositorio Clonado"'
      }
    }
    stage('building in dev') {
      agent { label DEVELOP }
      steps {
        sh 'echo "Iniciando dev"'
        sh 'docker build -t proyecto_docker_frontend:0.0.1 .'
        sh "docker save -o proyecto_docker_frontend.tar proyecto_docker_frontend:0.0.1"
        stash name: "stash-artifact", includes: "proyecto_docker_frontend.tar"
        archiveArtifacts 'proyecto_docker_frontend.tar'
        sh 'echo "Finalizo etapa develop"'
      }
    }
    stage('deploying and testing in QA') {
      agent { label QA }
      steps{
          unstash "stash-artifact"
          sh "docker load -i proyecto_docker_frontend.tar"
          sh "docker container rm proyecto_docker_frontend -f || true"
          sh "docker run -idt -p 8888:80 --name proyecto_docker_frontend proyecto_docker_frontend:0.0.1"
          sh "netstat -tpln | grep 8888"
      }
    }
    stage("Deployment on PROD environment"){
      agent { label PRODUCTION }
      steps{
          unstash "stash-artifact"
          sh "docker load -i proyecto_docker_frontend.tar"
          sh "docker container rm proyecto_docker_frontend -f || true"
          sh "docker run -idt -p 8881:80 --name proyecto_docker_frontend proyecto_docker_frontend:0.0.1"
      }
    }
  }
}
