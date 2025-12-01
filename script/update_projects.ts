import "dotenv/config";
import { db } from "../api/lib/db";
import { portfolioProjectsTable } from "../shared/schema";
import { sql } from "drizzle-orm";

async function updateProjects() {
    console.log("Clearing existing projects...");
    await db.delete(portfolioProjectsTable);

    console.log("Inserting new projects...");
    await db.insert(portfolioProjectsTable).values([
        {
            title: "Nocturne VPN – Fast, Secure & Private Proxy",
            industry: "Cybersecurity / VPN & Network Privacy",
            problem: "Users needed a fast, reliable, and secure VPN solution with global server coverage, stable sessions, and strong authentication — without ANRs or performance issues.",
            solution: "Built a high-performance VPN application using OpenVPN via VpnService, implementing server scoring and load balancing across 50+ global servers. Added background update handling with WorkManager, real-time speed dashboards, 3D globe visualization, dark mode, and secure multi-provider authentication.",
            outcome: "Delivered a stable, secure VPN platform achieving 99.9% ANR-free sessions, improved global connectivity performance, and enhanced user experience through real-time network insights and reliable encrypted connections.",
            techStack: ["Kotlin", "MVVM", "OpenVPN", "VpnService", "Coroutines", "WorkManager"],
            image: "/nocturnevpn-edited.png",
            featured: true,
            order: 1
        },
        {
            title: "AeroSecure – Aviation Compliance Monitoring System",
            industry: "Aviation / Compliance & Safety",
            problem: "Airline operators needed a centralized way to track aircraft safety checks, compliance logs, and maintenance alerts, as their existing systems were fragmented and manual.",
            solution: "Developed a cloud-based monitoring system with automated compliance tracking, real-time maintenance alerts, and a role-based dashboard for engineers and operations teams. Integrated secure data syncing for offline airport environments.",
            outcome: "Reduced compliance reporting time by 45%, improved maintenance issue detection accuracy, and streamlined operational communication across airport locations.",
            techStack: ["React", "Node.js", "PostgreSQL", "AWS Lambda", "Docker"],
            image: "/project-aviation.png",
            featured: true,
            order: 2
        },
        {
            title: "FinTrack – Personal Finance & Budgeting Mobile App",
            industry: "FinTech / Personal Finance",
            problem: "Users needed a simple, intuitive tool to track spending, set budgets, and view financial insights across multiple accounts.",
            solution: "Created a mobile finance app with secure bank integrations, AI-powered spending categorization, budget suggestions, and interactive financial analytics. Included biometric login and encrypted local storage.",
            outcome: "Improved user financial visibility, increased budgeting adherence by 60%, and achieved high engagement through personalized spending alerts.",
            techStack: ["Flutter", "Firebase", "REST API", "OAuth2", "Cloud Functions"],
            image: "/project-fintech.png",
            featured: true,
            order: 3
        }
    ]);

    console.log("Projects updated successfully!");
    process.exit(0);
}

updateProjects().catch((err) => {
    console.error("Error updating projects:", err);
    process.exit(1);
});
