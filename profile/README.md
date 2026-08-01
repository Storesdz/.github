<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,50:6366f1,100:8b5cf6&height=220&section=header&text=StoresDZ&fontSize=90&fontColor=ffffff&animation=fadeIn&fontAlignY=32&desc=The%20Multi-Tenant%20E-Commerce%20Engine&descAlignY=55&descSize=24" width="100%"/>

<br/>

<a href="https://readme-typing-svg.demolab.com">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=750&lines=Launch+your+online+store+in+minutes+%F0%9F%9A%80;Multi-tenant.+Dynamic+themes.+One+powerful+API.;Built+for+Algeria+%F0%9F%87%A9%F0%9F%87%BF+ready+for+the+world+%F0%9F%8C%8D" alt="Typing SVG" />
</a>

<br/>

[![Website](https://img.shields.io/badge/🌐_Website-storesdz.com-0ea5e9?style=for-the-badge)](https://storesdz.com)
[![API](https://img.shields.io/badge/⚡_API-api.storesdz.com-6366f1?style=for-the-badge)](https://api.storesdz.com)
[![Status](https://img.shields.io/badge/Status-Building_in_Public-22c55e?style=for-the-badge)](https://github.com/storesdz)
[![Made in](https://img.shields.io/badge/Made_in-Algeria-d21034?style=for-the-badge)](https://storesdz.com)

</div>

---

## 🚀 What is StoresDZ?

**StoresDZ** is a full-stack, multi-tenant e-commerce platform — think *Shopify, but open and built for Algeria*. One platform powers **unlimited storefronts**, each with its own domain, theme, language, products, and delivery rules — all served from a single high-performance Go API.

From merchant onboarding to checkout, from a blazing-fast SSR storefront to a cross-platform mobile app, StoresDZ covers the entire commerce stack — including the Kubernetes infrastructure it runs on.

<br/>

## ✨ Platform Highlights

<table>
<tr>
<td width="50%">

### 🏪 Truly Multi-Tenant
Host-based tenant resolution means every store gets its own domain, data, and experience — all from one deployment.

### 🎨 Dynamic Theme Engine
A dedicated Go (fasthttp) service renders per-store themes on the fly, with settings cached and streamed straight from S3.

### 🌍 Built-In i18n
Storefronts speak **Arabic (RTL), French, and English** out of the box via type-safe inlang/paraglide translations.

### 🚚 Algeria-Ready Commerce
Native **wilaya-based delivery** pricing and **Cash-on-Delivery** flows — the way commerce actually works in DZ.

</td>
<td width="50%">

### 🔐 Secure by Design
JWT + Google OAuth authentication with fine-grained, role-based access control powered by **Casbin**.

### ⚡ Event-Driven Core
**NATS** streams power background jobs and async processing; **Redis** caches the hot paths.

### 🤖 AI-Powered
OpenAI & Google Gemini integrations bring intelligent features to merchants.

### 📊 Observable & GitOps-Ready
Prometheus metrics, Grafana dashboards, ArgoCD deployments, Harbor registry, and Traefik ingress — production-grade from day one.

</td>
</tr>
</table>

<br/>

## 🧩 The Ecosystem

| Project | What it does | Built with |
|:---|:---|:---|
| 🛍️ [**storefront**](https://github.com/storesdz/storefront) | Customer-facing storefronts — multi-tenant, SSR, dynamically themed | ![SvelteKit](https://img.shields.io/badge/SvelteKit_2_+_Svelte_5-FF3E00?logo=svelte&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_4-38BDF8?logo=tailwindcss&logoColor=white) |
| 🖥️ [**dashboard**](https://github.com/storesdz/dashboard) | Merchant admin panel — orders, products, funnels, staff, analytics | ![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white) |
| ⚙️ [**backend**](https://github.com/storesdz/backend) | The core API & business logic — the single source of truth | ![Go](https://img.shields.io/badge/Go_1.22-00ADD8?logo=go&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) ![sqlc](https://img.shields.io/badge/sqlc-4B6B8A?logoColor=white) |
| 🎨 [**theme-engine**](https://github.com/storesdz/theme-engine) | On-the-fly theme rendering service with S3-backed theme storage | ![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white) ![fasthttp](https://img.shields.io/badge/fasthttp-009688?logoColor=white) ![S3](https://img.shields.io/badge/AWS_S3-569A31?logo=amazons3&logoColor=white) |
| 📱 [**storesdzapp**](https://github.com/storesdz/storesdzapp) | Cross-platform mobile app for iOS, Android, web & desktop | ![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white) ![Dart](https://img.shields.io/badge/Dart-0175C2?logo=dart&logoColor=white) |
| 📦 [**storesdz-cli**](https://github.com/storesdz/storesdz-cli) | `create-storesdz` — scaffold a new app in seconds | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| 🧱 [**storesdz-core**](https://github.com/storesdz/storesdz-core) | Shared SDK & Vite plugin powering the JS ecosystem | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| ☸️ [**k8s**](https://github.com/storesdz/k8s) | Infrastructure as Code — ingress, GitOps, storage, monitoring | ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white) ![Traefik](https://img.shields.io/badge/Traefik-24A1C1?logo=traefikproxy&logoColor=white) ![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?logo=argo&logoColor=white) |

<br/>

## 🏗️ How It All Fits Together

```mermaid
flowchart LR
    subgraph Clients["👥 Clients"]
        SF["🛍️ Storefronts<br/>SvelteKit SSR"]
        DB["🖥️ Dashboard<br/>React"]
        MB["📱 Mobile App<br/>Flutter"]
    end

    subgraph Platform["⚙️ StoresDZ Platform"]
        API["Core API<br/>Go · Gin · Casbin"]
        TE["Theme Engine<br/>Go · fasthttp"]
        WK["Worker<br/>NATS consumer"]
    end

    subgraph Data["💾 Data & Services"]
        PG[("PostgreSQL")]
        RD[("Redis")]
        NQ["NATS"]
        S3[("AWS S3")]
        SES["AWS SES"]
        AI["OpenAI · Gemini"]
    end

    SF --> API
    SF --> TE
    DB --> API
    MB --> API
    API --> PG & RD & NQ & S3 & SES & AI
    NQ --> WK
    TE --> S3
```

<br/>

## 🛠️ Tech Stack

<div align="center">

<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=go,ts,svelte,react,vite,tailwind,flutter,dart,bun&perline=9" />
  <br/>
  <img src="https://skillicons.dev/icons?i=postgres,redis,docker,kubernetes,aws,nginx,grafana,prometheus,github&perline=9" />
</a>

**Also in the mix:** NATS · Casbin · sqlc · Traefik · ArgoCD · Harbor · Longhorn · TanStack Query & Router · shadcn/ui · Recharts · Framer Motion · inlang/paraglide

</div>

<br/>

## ⚡ Quick Start

```bash
# 🐣 Scaffold a brand-new app
bunx create-storesdz my-app

# ⚙️ Spin up the backend (Postgres, migrations, codegen, server)
make dev

# 🛍️ Run a storefront / 🖥️ the dashboard
cd storefront && bun install && bun run dev
cd dashboard  && bun install && bun run dev
```

<br/>

## 🤝 Get Involved

We're building StoresDZ in the open and we'd love your help — whether it's a bug report, a new theme, a translation, or a whole feature.

- 🐛 **Found a bug?** Open an issue in the relevant repo.
- 💡 **Have an idea?** Start a discussion — we're listening.
- 🔧 **Want to contribute?** Check out the [contribution guide](https://github.com/storesdz/backend/blob/master/docs/04_CONTRIBUTING.md) to get oriented.

<br/>

<div align="center">

**Made with ❤️ in Algeria 🇩🇿**

[![Website](https://img.shields.io/badge/storesdz.com-0ea5e9?style=flat-square&logo=google-chrome&logoColor=white)](https://storesdz.com)
[![GitHub](https://img.shields.io/badge/@storesdz-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/storesdz)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8b5cf6,50:6366f1,100:0ea5e9&height=120&section=footer" width="100%"/>

</div>
