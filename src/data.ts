export type MetricHighlight = {
  label: string;
  value: string;
  change?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
  category: "Machine Learning" | "Data Analytics" | "Web App" | "Productivity";
  featured: boolean;
  metrics: MetricHighlight[];
  problemStatement: string;
  methodology: {
    title: string;
    description: string;
  }[];
  keyResults: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
};

export const projects: Project[] = [
  {
    slug: "dbt-snowflake-analytics-platform",
    title: "dbt Snowflake Analytics Platform",
    subtitle: "Production-Grade dbt Core & Snowflake Data Mart Architecture",
    description:
      "A modular, production-ready analytics engineering platform built with dbt Core and Snowflake. Implements Kimball dimensional star schema modeling (staging, intermediate, and marts layers), automated data quality testing assertions, and live Mermaid data lineage graphs.",
    tech: ["dbt Core", "Snowflake", "SQL", "Kimball Star Schema", "Data Lineage", "dbt Tests"],
    repoUrl: "https://github.com/ShaunDataAnalytics/dbt-snowflake-analytics-platform",
    demoUrl: "https://github.com/ShaunDataAnalytics/dbt-snowflake-analytics-platform",
    category: "Data Analytics",
    featured: true,
    metrics: [
      { label: "Query Speedup", value: "8m -> <15s", change: "96.8% latency reduction" },
      { label: "Data Quality Tests", value: "100% Pass", change: "unique & not_null" },
      { label: "Architecture", value: "Staging + Marts" },
      { label: "Warehouse", value: "Snowflake" },
    ],
    problemStatement:
      "Enterprise data pipelines frequently suffer from unstructured SQL queries, schema drift, and long executive dashboard runtimes. This platform establishes a version-controlled dbt architecture on Snowflake to deliver reliable, low-latency analytical data models.",
    methodology: [
      {
        title: "1. Staging & Modular CTE Transformations",
        description:
          "Extracted raw transactional schemas into staging views, applying consistent type casting, column renaming, and surrogate key generation.",
      },
      {
        title: "2. Dimensional & Fact Marts Modeling",
        description:
          "Constructed Kimball dimensional models including dim_customers and fct_orders with aggregated revenue metrics and customer lifetime value calculations.",
      },
      {
        title: "3. Automated Testing & Data Lineage",
        description:
          "Configured dbt schema test definitions (unique, not_null, referential integrity relationships) and generated dynamic Mermaid lineage DAG diagrams.",
      },
    ],
    keyResults: [
      "Slashing core executive dashboard query execution times from ~8 minutes down to <15 seconds.",
      "Achieved 100% test coverage across primary keys and foreign key relationships.",
      "Established modular, reusable data models for self-service BI and executive reporting.",
    ],
    codeSnippet: {
      language: "sql",
      code: `with customers as (
    select * from {{ ref("stg_customers") }}
),
orders as (
    select * from {{ ref("stg_orders") }}
),
customer_orders as (
    select
        customer_id,
        min(order_date) as first_order_date,
        max(order_date) as most_recent_order_date,
        count(order_id) as number_of_orders,
        sum(amount) as lifetime_value
    from orders
    group by 1
),
final as (
    select
        c.customer_id,
        c.first_name,
        c.last_name,
        c.email,
        co.first_order_date,
        co.most_recent_order_date,
        coalesce(co.number_of_orders, 0) as number_of_orders,
        coalesce(co.lifetime_value, 0) as lifetime_value
    from customers c
    left join customer_orders co using (customer_id)
)
select * from final`,
    },
  },
  {
    slug: "sql-performance-tuning-benchmarks",
    title: "SQL Performance Tuning & Query Optimization",
    subtitle: "Enterprise Query Refactoring & Snowflake/BigQuery Performance Benchmarks",
    description:
      "A collection of real-world query optimization case studies demonstrating advanced SQL techniques, window function partitioning, CTE refactoring, and Snowflake micro-partition pruning that reduced query latency by 96.8%.",
    tech: ["SQL", "Snowflake", "BigQuery", "Query Profiling", "Data Warehousing", "Performance Tuning"],
    repoUrl: "https://github.com/ShaunDataAnalytics/analytics-engineer-portfolio",
    category: "Data Analytics",
    featured: true,
    metrics: [
      { label: "Latency Reduction", value: "96.8%" },
      { label: "Execution Time", value: "8m -> <15s" },
      { label: "Partition Pruning", value: "100% Optimized" },
    ],
    problemStatement:
      "High-volume analytical queries over billions of rows often bottleneck BI tools and inflate cloud warehouse compute costs. This benchmark documents systematic SQL query tuning strategies to maximize execution throughput.",
    methodology: [
      {
        title: "1. Execution Plan & Query Profiling Analysis",
        description:
          "Analyzed Snowflake Query Profile & BigQuery execution graphs to identify expensive full table scans and spill to local/remote storage.",
      },
      {
        title: "2. Window Functions & Partition Pruning",
        description:
          "Replaced inefficient self-joins and correlated subqueries with analytic window functions (QUALIFY, ROW_NUMBER) and optimized cluster keys.",
      },
      {
        title: "3. CTE Streamlining & Aggregation Pre-computation",
        description:
          "Refactored multi-pass queries into single-pass Common Table Expressions with early aggregation filters.",
      },
    ],
    keyResults: [
      "Reduced execution latency from 8 minutes to <15 seconds on executive reporting queries.",
      "Eliminated Snowflake disk spilling and significantly reduced compute credit consumption.",
    ],
    codeSnippet: {
      language: "sql",
      code: `-- High-performance single-pass query with QUALIFY clause
select
    customer_id,
    order_id,
    order_date,
    amount,
    sum(amount) over (partition by customer_id order by order_date) as running_total
from {{ ref("stg_orders") }}
where order_date >= current_date()
qualify row_number() over (partition by customer_id order by order_date desc) = 1;`,
    },
  },
  {
    slug: "focus-pomodoro-chrome-extension",
    title: "Focus Pomodoro Chrome Extension",
    subtitle: "Deep Work Sprint & Productivity Extension",
    description:
      "A lightweight, micro-sprint productivity Chrome extension built for deep work focus management, custom timer intervals, and local session analytics.",
    tech: ["JavaScript", "Chrome Extension API", "HTML5", "CSS3", "Productivity"],
    repoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    demoUrl: "https://github.com/ShaunDataAnalytics/focus-pomodoro-chrome-extension",
    category: "Productivity",
    featured: true,
    metrics: [
      { label: "Focus Sprint Cap", value: "25 Min" },
      { label: "UI Overhead", value: "< 10ms" },
      { label: "Data Storage", value: "100% Local" },
    ],
    problemStatement:
      "Knowledge workers lose momentum due to task-switching and cognitive friction. This extension provides frictionless 25-minute focus timers directly inside the browser.",
    methodology: [
      {
        title: "1. Manifest V3 Chrome Extension Architecture",
        description:
          "Built using modern Chrome Extension V3 standards with background service workers and popup state synchronization.",
      },
      {
        title: "2. Zero-Latency Local Storage",
        description:
          "Utilized chrome.storage.local API for persistent session tracking without external network overhead.",
      },
    ],
    keyResults: [
      "Delivered lightweight, zero-distraction deep work sprint timer for high-focus execution.",
    ],
  },
  {
    slug: "analytics-engineer-portfolio",
    title: "Analytics Engineering Reference Portfolio",
    subtitle: "Modern Data Stack Design Patterns & Production Templates",
    description:
      "A comprehensive repository of analytics engineering design patterns, dbt model templates, Snowflake/BigQuery performance guidelines, and Kimball star schema examples.",
    tech: ["dbt", "Snowflake", "BigQuery", "Python", "SQL", "Git"],
    repoUrl: "https://github.com/ShaunDataAnalytics/analytics-engineer-portfolio",
    category: "Data Analytics",
    featured: true,
    metrics: [
      { label: "Warehouses Supported", value: "Snowflake & BigQuery" },
      { label: "Design Patterns", value: "Staging / Marts / CTEs" },
      { label: "dbt Version", value: "Core v1.8+" },
    ],
    problemStatement:
      "Establishing standard analytics engineering practices across growing data teams requires consistent documentation and reusable project boilerplate.",
    methodology: [
      {
        title: "1. Standardized Naming & Modeling Conventions",
        description:
          "Defined clear directory structures (staging, intermediate, marts) and dbt materialization rules.",
      },
      {
        title: "2. Reusable Testing & Macro Templates",
        description:
          "Created modular dbt macros for surrogate key generation and custom data quality tests.",
      },
    ],
    keyResults: [
      "Serves as a production-ready reference blueprint for analytics engineering implementation.",
    ],
  },
];
