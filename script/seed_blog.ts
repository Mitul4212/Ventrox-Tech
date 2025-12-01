import "dotenv/config";
import { db } from "../api/lib/db";
import { blogPosts } from "../shared/schema";

async function seedBlog() {
    console.log("Seeding blog post...");

    await db.insert(blogPosts).values({
        title: "The Ultimate Guide to Outsourcing Software Development to India in 2025",
        slug: "outsourcing-software-development-india-2025",
        excerpt: "Discover why India remains the top destination for software outsourcing and how to navigate the landscape in 2025 for maximum ROI.",
        content: `
## Why Outsource to India in 2025?

India continues to dominate the global outsourcing market, holding a 56% share. But it's not just about cost anymore. In 2025, India is the hub for **AI innovation**, **Scalable SaaS**, and **Enterprise-grade security**.

### 1. Access to Top Global Talent
India produces over 1.5 million engineers annually. With the rise of IITs and specialized tech institutes, the quality of code is on par with Silicon Valley, but at a fraction of the cost.

### 2. Cost Efficiency vs. Quality
While rates have increased, you still save 40-60% compared to US/UK developers. 
*   **US Developer**: $100 - $150 / hour
*   **India Senior Dev**: $30 - $50 / hour

### 3. Time Zone Advantage
The 9.5 to 12.5 hour time difference allows for a "Follow the Sun" model. Your US team sleeps while your Indian team builds.

## How to Choose the Right Partner?

1.  **Look for "Value", not "Cheap"**: The cheapest option often costs more in the long run due to rewrites.
2.  **Check Communication Skills**: Ensure they speak your language—literally and technically.
3.  **Verify Security Standards**: Look for GDPR compliance and NDA adherence.

## Conclusion

Outsourcing to India is a strategic move for startups and enterprises looking to scale fast. At **VentroX Tech**, we bridge the gap between global standards and local expertise.
        `,
        author: "Mitul Chovatiya",
        category: "Outsourcing",
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    });

    console.log("Blog post seeded successfully!");
    process.exit(0);
}

seedBlog().catch((err) => {
    console.error("Error seeding blog:", err);
    process.exit(1);
});
