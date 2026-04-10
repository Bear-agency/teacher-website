import type { TechnologyCategoryEntry } from "./types";

export const siteMeta = {
  name: "Vladyslav Ataman",
  email: "bearlikescode@gmail.com",
  github: "https://github.com/BearLikeCode",
  linkedin: "https://www.linkedin.com/in/vlad-ataman/",
} as const;

/** Titles: `TechCategories.{id}`; subgroup labels: `TechGroups.{subgroupId}` */
export const technologyCategories: TechnologyCategoryEntry[] = [
  {
    id: "languages",
    items: [
      "JavaScript (ES6+)",
      "TypeScript (strict, shared types)",
      "Python",
      "SQL",
      "Shell (Bash/Zsh)",
    ],
  },
  {
    id: "application",
    groups: [
      {
        subgroupId: "ui",
        items: [
          "React",
          "Next.js",
          "Redux",
          "TanStack Query",
          "AG Grid",
          "React Native",
          "Tailwind CSS",
        ],
      },
      {
        subgroupId: "services",
        items: [
          "Node.js",
          "Express",
          "NestJS",
          "REST APIs",
          "GraphQL",
          "Zod",
          "OpenAPI",
          "Python services",
          "AWS Lambda",
          "Amazon SQS & SNS",
        ],
      },
      {
        subgroupId: "ai",
        items: [
          "LLM APIs (OpenAI, Anthropic, Azure OpenAI)",
          "RAG & document / structured extraction pipelines",
          "Embeddings, chunking & relevance tuning",
          "Prompt design, evals & guardrails for production",
          "Tool-calling & agentic workflows (where appropriate)",
          "AI-assisted engineering (ChatGPT, Claude, Cursor)",
        ],
      },
    ],
  },
  {
    id: "data-platform",
    groups: [
      {
        subgroupId: "databases",
        items: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "Firebase / Firestore",
          "Prisma",
          "Vector search (e.g. pgvector, managed vector DBs)",
          "Schema design & query tuning",
        ],
      },
      {
        subgroupId: "platform",
        items: [
          "AWS (ECS, ECR, S3, ALB, EC2, IAM)",
          "Docker",
          "Kubernetes (workloads & deployments)",
          "Terraform",
          "GitHub Actions",
          "CI/CD",
          "Prometheus & Grafana",
          "OpenTelemetry",
        ],
      },
    ],
  },
  {
    id: "delivery-quality",
    groups: [
      {
        subgroupId: "architecture",
        items: [
          "WebSockets (Socket.io)",
          "Microservices",
          "Event-driven design (Kafka / queues)",
          "Scalable systems",
          "Hexagonal & event-driven (teaching)",
          "API versioning & backward compatibility",
          "Idempotent APIs & safe retries",
        ],
      },
      {
        subgroupId: "integrations",
        items: [
          "OAuth 2.0 / OIDC",
          "Okta (SSO)",
          "JWT & session hardening",
          "Stripe & payment flows",
          "Webhooks",
          "Atlassian / Jira APIs",
        ],
      },
      {
        subgroupId: "testing",
        items: [
          "Jest",
          "Cypress",
          "Playwright",
          "Mocha",
          "Supertest",
          "k6 (load testing)",
        ],
      },
    ],
  },
];

export const subjectRegistry = [
  { id: "algorithms", icon: "algorithms" as const },
  { id: "data-structures", icon: "data-structures" as const },
  { id: "databases", icon: "databases" as const },
];

/** Narrative fields loaded from messages `Courseworks.items.{slug}` */
export const courseworkRegistry: Array<{
  slug: string;
  techStack: string[];
  githubUrl: string;
  codeExample?: { filename: string; code: string };
}> = [
  {
    slug: "hexagonal-order-service",
    techStack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Jest",
      "OpenAPI",
    ],
    githubUrl: "https://github.com/example/hexagonal-order-service",
    codeExample: {
      filename: "ports/PlaceOrder.ts",
      code: `export interface PlaceOrderPort {
  execute(command: PlaceOrderCommand): Promise<OrderReceipt>;
}

// Domain stays ignorant of HTTP or SQL—only this shape matters.
export type PlaceOrderCommand = {
  customerId: string;
  lines: ReadonlyArray<{ sku: string; qty: number }>;
};`,
    },
  },
  {
    slug: "event-driven-inventory",
    techStack: [
      "Kafka (or Redpanda)",
      "PostgreSQL",
      "TypeScript",
      "Zod",
      "Prometheus",
    ],
    githubUrl: "https://github.com/example/event-driven-inventory",
    codeExample: {
      filename: "consumers/handlers/stock.ts",
      code: `export async function onStockEvent(
  msg: StockEventV2,
  ctx: HandlerContext
) {
  const key = \`\${msg.sku}:\${msg.sequence}\`;
  if (await ctx.store.seen(key)) return; // idempotent exit

  await ctx.projector.apply(msg);
  await ctx.store.markSeen(key);
}`,
    },
  },
  {
    slug: "fullstack-assessment-platform",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "OpenTelemetry",
    ],
    githubUrl: "https://github.com/example/assessment-platform",
    codeExample: {
      filename: "app/api/submit/route.ts",
      code: `// BFF: validate, enqueue, return 202 — never block on grading.
export async function POST(req: Request) {
  const body = await parseSubmitBody(req);
  const id = await enqueueGradeJob(body);
  return Response.json({ jobId: id }, { status: 202 });
}`,
    },
  },
];

/** Card copy from messages `Projects.items.{id}` */
export const personalProjectRegistry: Array<{
  id: string;
  href: string;
  linkLabel: string;
  stack?: string[];
}> = [
  {
    id: "arch-kata-cli",
    href: "https://github.com/example/arch-kata-cli",
    linkLabel: "GitHub",
    stack: ["TypeScript", "Node.js"],
  },
  {
    id: "lecture-notes-publisher",
    href: "https://github.com/example/lecture-notes",
    linkLabel: "GitHub",
    stack: ["Next.js", "MDX"],
  },
  {
    id: "latency-lab",
    href: "https://github.com/example/latency-lab",
    linkLabel: "GitHub",
    stack: ["Docker", "OpenTelemetry", "Prometheus"],
  },
];
