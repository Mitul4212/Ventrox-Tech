import { db } from "../server/db";
import { portfolioProjectsTable } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateProjectImages() {
    console.log("Updating project images...");

    // Update Nocturne VPN
    await db.update(portfolioProjectsTable)
        .set({ image: "/project-vpn.png" })
        .where(eq(portfolioProjectsTable.title, "Nocturne VPN – Fast, Secure & Private Proxy"));

    // Update AeroSecure
    await db.update(portfolioProjectsTable)
        .set({ image: "/project-aviation.png" })
        .where(eq(portfolioProjectsTable.title, "AeroSecure – Aviation Compliance Monitoring System"));

    // Update FinTrack
    await db.update(portfolioProjectsTable)
        .set({ image: "/project-fintech.png" })
        .where(eq(portfolioProjectsTable.title, "FinTrack – Personal Finance & Budgeting Mobile App"));

    console.log("Project images updated successfully!");
    process.exit(0);
}

updateProjectImages().catch((err) => {
    console.error("Error updating project images:", err);
    process.exit(1);
});
