import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  Briefcase, 
  BarChart3, 
  LogOut, 
  Loader2, 
  Eye,
  Trash2,
  Edit,
  Plus,
  Check,
  Clock,
  Archive
} from "lucide-react";
import type { ContactInquiry, BlogPost, PortfolioProject, InsertBlogPost, InsertPortfolioProject } from "@shared/schema";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/admin/login", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Logged in successfully" });
      onLogin();
    },
    onError: () => {
      toast({ title: "Invalid credentials", variant: "destructive" });
    },
  });

  const setupMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/setup", {});
      return res.json();
    },
    onSuccess: (data) => {
      toast({ title: "Admin setup complete", description: data.message });
    },
    onError: () => {
      toast({ title: "Setup failed or admin already exists", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              data-testid="input-admin-username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              data-testid="input-admin-password"
            />
          </div>
          <Button
            className="w-full"
            onClick={() => loginMutation.mutate({ username, password })}
            disabled={loginMutation.isPending}
            data-testid="button-admin-login"
          >
            {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setupMutation.mutate()}
            disabled={setupMutation.isPending}
            data-testid="button-admin-setup"
          >
            {setupMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            First Time Setup
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Click "First Time Setup" to create the default admin account (admin / admin123)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function InquiriesPanel() {
  const { data, isLoading } = useQuery<{ success: boolean; data: ContactInquiry[] }>({
    queryKey: ["/api/admin/inquiries"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/inquiries/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
    },
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    "in-progress": "bg-yellow-500",
    resolved: "bg-green-500",
    archived: "bg-gray-500",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const inquiries = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contact Inquiries</h3>
        <Badge variant="secondary">{inquiries.length} total</Badge>
      </div>
      
      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No inquiries yet
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} data-testid={`card-inquiry-${inquiry.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{inquiry.name}</span>
                      <Badge variant="outline" className="text-xs">{inquiry.inquiryType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    {inquiry.company && (
                      <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                    )}
                    <p className="text-sm mt-2">{inquiry.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : "No date"}
                    </p>
                  </div>
                  <Select
                    value={inquiry.status || "new"}
                    onValueChange={(status) => updateStatusMutation.mutate({ id: inquiry.id, status })}
                  >
                    <SelectTrigger className="w-32" data-testid={`select-status-${inquiry.id}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusColors[inquiry.status || "new"]}`} />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<InsertBlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Ventrox Team",
    published: false,
  });
  const { toast } = useToast();

  const { data, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/admin/blog"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const res = await apiRequest("POST", "/api/admin/blog", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsEditing(false);
      resetForm();
      toast({ title: "Blog post created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      const res = await apiRequest("PATCH", `/api/admin/blog/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setIsEditing(false);
      setEditingPost(null);
      resetForm();
      toast({ title: "Blog post updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/blog/${id}`, undefined);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "Blog post deleted" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "Ventrox Team",
      published: false,
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      published: post.published ?? false,
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData as InsertBlogPost });
    } else {
      createMutation.mutate(formData as InsertBlogPost);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const posts = data?.data || [];

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{editingPost ? "Edit Post" : "New Post"}</h3>
          <Button variant="ghost" onClick={() => { setIsEditing(false); setEditingPost(null); resetForm(); }}>
            Cancel
          </Button>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                placeholder="Post title"
                data-testid="input-blog-title"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="post-slug"
                data-testid="input-blog-slug"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Technology"
                data-testid="input-blog-category"
              />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
                data-testid="input-blog-author"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief description..."
              rows={2}
              data-testid="input-blog-excerpt"
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full post content..."
              rows={10}
              data-testid="input-blog-content"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published ?? false}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">Published</span>
            </label>
            <Button 
              onClick={handleSubmit} 
              disabled={createMutation.isPending || updateMutation.isPending}
              data-testid="button-blog-save"
            >
              {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Blog Posts</h3>
        <Button onClick={() => setIsEditing(true)} data-testid="button-blog-new">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>
      
      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No blog posts yet. Create your first post!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} data-testid={`card-blog-${post.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.title}</span>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No date"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(post)}
                      data-testid={`button-edit-${post.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteMutation.mutate(post.id)}
                      data-testid={`button-delete-${post.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PortfolioPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState<Partial<InsertPortfolioProject>>({
    title: "",
    industry: "",
    problem: "",
    solution: "",
    outcome: "",
    techStack: [],
    featured: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState("");
  const { toast } = useToast();

  const { data, isLoading } = useQuery<{ success: boolean; data: PortfolioProject[] }>({
    queryKey: ["/api/portfolio"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPortfolioProject) => {
      const res = await apiRequest("POST", "/api/admin/portfolio", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      setIsEditing(false);
      resetForm();
      toast({ title: "Project created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPortfolioProject> }) => {
      const res = await apiRequest("PATCH", `/api/admin/portfolio/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      setIsEditing(false);
      setEditingProject(null);
      resetForm();
      toast({ title: "Project updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/portfolio/${id}`, undefined);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Project deleted" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      industry: "",
      problem: "",
      solution: "",
      outcome: "",
      techStack: [],
      featured: false,
      order: 0,
    });
    setTechInput("");
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      industry: project.industry,
      problem: project.problem,
      solution: project.solution,
      outcome: project.outcome,
      techStack: project.techStack,
      featured: project.featured ?? false,
      order: project.order ?? 0,
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData as InsertPortfolioProject });
    } else {
      createMutation.mutate(formData as InsertPortfolioProject);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack: [...(formData.techStack || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (index: number) => {
    setFormData({
      ...formData,
      techStack: (formData.techStack || []).filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const projects = data?.data || [];

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{editingProject ? "Edit Project" : "New Project"}</h3>
          <Button variant="ghost" onClick={() => { setIsEditing(false); setEditingProject(null); resetForm(); }}>
            Cancel
          </Button>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project title"
                data-testid="input-portfolio-title"
              />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="FinTech"
                data-testid="input-portfolio-industry"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Challenge / Problem</Label>
            <Textarea
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="What challenge did the client face?"
              rows={2}
              data-testid="input-portfolio-problem"
            />
          </div>
          <div className="space-y-2">
            <Label>Solution</Label>
            <Textarea
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="How did we solve it?"
              rows={2}
              data-testid="input-portfolio-solution"
            />
          </div>
          <div className="space-y-2">
            <Label>Outcome / Results</Label>
            <Textarea
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="What results were achieved?"
              rows={2}
              data-testid="input-portfolio-outcome"
            />
          </div>
          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <div className="flex gap-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                data-testid="input-portfolio-tech"
              />
              <Button type="button" variant="outline" onClick={addTech}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.techStack || []).map((tech, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTech(index)}>
                  {tech} ×
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.order ?? 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                data-testid="input-portfolio-order"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer h-9">
                <input
                  type="checkbox"
                  checked={formData.featured ?? false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Featured Project</span>
              </label>
            </div>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={createMutation.isPending || updateMutation.isPending}
            data-testid="button-portfolio-save"
          >
            {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {editingProject ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Portfolio Projects</h3>
        <Button onClick={() => setIsEditing(true)} data-testid="button-portfolio-new">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No projects yet. Add your first case study!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} data-testid={`card-project-${project.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.title}</span>
                      <Badge variant="outline">{project.industry}</Badge>
                      {project.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.problem}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.slice(0, 4).map((tech, index) => (
                        <span key={index} className="px-2 py-0.5 rounded text-xs bg-muted">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(project)}
                      data-testid={`button-edit-project-${project.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteMutation.mutate(project.id)}
                      data-testid={`button-delete-project-${project.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsPanel() {
  const { data, isLoading } = useQuery<{ 
    success: boolean; 
    data: { 
      pageViews: { path: string; views: number }[]; 
      totalViews: number; 
      totalInquiries: number;
      newInquiries: number;
    } 
  }>({
    queryKey: ["/api/admin/analytics"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const analytics = data?.data;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Analytics Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="stat-total-views">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analytics?.totalViews || 0}</p>
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-total-inquiries">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analytics?.totalInquiries || 0}</p>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-new-inquiries">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analytics?.newInquiries || 0}</p>
                <p className="text-sm text-muted-foreground">New Inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-testid="stat-conversion">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {analytics?.totalViews ? ((analytics.totalInquiries / analytics.totalViews) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Page Views by Path</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics?.pageViews?.length ? (
            <div className="space-y-3">
              {analytics.pageViews.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between" data-testid={`row-pageview-${index}`}>
                  <span className="text-sm font-mono">{page.path}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${(page.views / (analytics.pageViews[0]?.views || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">{page.views}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No page views tracked yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { data: authData, isLoading: authLoading } = useQuery<{ success: boolean; user?: any }>({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  useEffect(() => {
    if (!authLoading) {
      setIsAuthenticated(authData?.success || false);
    }
  }, [authData, authLoading]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/logout", {});
      return res.json();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
    },
  });

  if (authLoading || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-admin">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="font-bold text-xl">Admin Dashboard</h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => logoutMutation.mutate()}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="inquiries" className="flex items-center gap-2" data-testid="tab-inquiries">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Inquiries</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2" data-testid="tab-blog">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2" data-testid="tab-portfolio">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2" data-testid="tab-analytics">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <InquiriesPanel />
          </TabsContent>

          <TabsContent value="blog">
            <BlogPanel />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioPanel />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
