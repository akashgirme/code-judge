group "default" {
    targets = ["api", "client", "cee-server", "cee-worker-c", "cee-worker-cpp", "cee-worker-go", "cee-worker-java", "cee-worker-js"]
}

target "api" {
    context = "."
    dockerfile = "docker/api/Dockerfile.api"
    tags = ["akashgirme/codejudge:api"]
}

target "client" {
    context = "."
    dockerfile = "docker/client/Dockerfile.client"
    tags = ["akashgirme/codejudge:client"]
}

target "cee-server" {
    context = "."
    dockerfile = "docker/execution-engine/server/Dockerfile.cee.server"
    tags = ["akashgirme/codejudge:cee-server"]
}

target "cee-worker-c" {
    context = "."
    dockerfile = "docker/execution-engine/worker/Dockerfile.worker.c"
    tags = ["akashgirme/codejudge:cee-worker-c"]
}

target "cee-worker-cpp" {
    context = "."
    dockerfile = "docker/execution-engine/worker/Dockerfile.worker.cpp"
    tags = ["akashgirme/codejudge:cee-worker-cpp"]
}

target "cee-worker-go" {
    context = "."
    dockerfile = "docker/execution-engine/worker/Dockerfile.worker.go"
    tags = ["akashgirme/codejudge:cee-worker-go"]
}

target "cee-worker-java" {
    context = "."
    dockerfile = "docker/execution-engine/worker/Dockerfile.worker.java"
    tags = ["akashgirme/codejudge:cee-worker-java"]
}

target "cee-worker-js" {
    context = "."
    dockerfile = "docker/execution-engine/worker/Dockerfile.worker.js"
    tags = ["akashgirme/codejudge:cee-worker-js"]
}