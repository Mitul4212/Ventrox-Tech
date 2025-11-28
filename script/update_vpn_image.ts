import { db } from "../api/lib/db";
import { portfolioProjectsTable } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateVpnImage() {
    console.log("Updating Nocturne VPN image...");

    await db.update(portfolioProjectsTable)
        .set({ image: "/nocturnevpn-edited.png" })
        .where(eq(portfolioProjectsTable.title, "Nocturne VPN – Fast, Secure & Private Proxy"));

    console.log("Nocturne VPN image updated successfully!");
    process.exit(0);
}

updateVpnImage().catch((err) => {
    console.error("Error updating VPN image:", err);
    process.exit(1);
});
