# 🧩 Algo Forge — Algorithmic Coding Challenges Platform

**Algo Forge** is a LeetCode-style platform for practicing algorithmic coding challenges.  
It provides an end-to-end environment where users can write, submit, and execute code securely inside a sandbox.

The platform supports **multi-language execution**, **real-time feedback**, and **scalable deployment** using **Docker** and **Kubernetes**.

---

## ⚙️ Tech Stack

- **Backend:** Nest.js  
- **Frontend:** Next.js  
- **Database:** PostgreSQL  
- **Caching & Queues:** Redis  
- **Code Execution Sandbox:** Isolate (built on Linux namespaces & cgroups)  
- **Infrastructure:** Docker, Kubernetes, Helm, Nx Monorepo  

---

## 🧠 Project Architecture

The platform follows a **3-service architecture**:

| Service | Description |
|----------|-------------|
| **api** | Backend server handling user, problem, and submission logic |
| **web** | Frontend Next.js application |
| **worker** | Executes user-submitted code in sandboxed environments |

All services are containerized using Docker and orchestrated with Kubernetes via Helm.

📈 Features

- Secure sandboxed code execution using Isolate
- Scalable architecture with autoscaling workers
- Modular Nx monorepo for efficient development
- CI/CD ready with Docker & Helm charts
- Real-time feedback on code submissions

🧩 Folder Structure
```bash
algo-forge/
├── apps/
│   ├── api/
│   ├── web/
│   └── worker/
├── infra/
│   ├── docker/
│   └── k8s/
│       └── helm/
├── docker-compose.dev.yml
├── libs/
├── nx.json
└── package.json
```
---

## 🚀 Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/akashgirme/algo-forge.git
cd algo-forge

npm install

```

## Migrations

`npm run migration:generate db/migrations/useful-migration-name`

`npm run migration:run`


## Start Development Servers (Nx Monorepo)
```bash
# Start backend API
npx nx serve api

# Start frontend
npx nx serve web

# Start worker service
npx nx serve worker
```

## 🐳 Run Entire Stack with Docker Compose

You can run the full development environment (API, Web, Worker) using the included docker-compose.dev.yml file.
```bash
# Start all services
docker compose -f docker-compose.dev.yml up --build

# Stop all services
docker compose -f docker-compose.dev.yml down
```

## 🐋 Build Docker Images

Each service has its own Dockerfile under infra/docker/.

```bash
# Build frontend image
docker build -t <username>/web --env-file=<path-to-env> -f ./infra/docker/web/Dockerfile.web .

# Build backend image
docker build -t <username>/api --env-file=<path-to-env> -f ./infra/docker/api/Dockerfile.api .

# Build worker image
docker build -t <username>/worker --env-file=<path-to-env> -f ./infra/docker/worker/Dockerfile.worker .

```

☸️ Deploy with Kubernetes (Helm)

```bash
helm install algo-forge -f infra/k8s/helm

# To uninstall
helm uninstall algo-forge
```
